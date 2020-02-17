import * as Yup from 'yup'

import Device from '../models/Device'

class DeviceController {
  async index (req, res) {
    const devices = await Device.find()

    return res.json(devices)
  }

  async store (req, res) {
    const { type, gradient } = req.body

    const schema = Yup.object().shape({
      type: Yup.string().required(),
      gradient: Yup.array().of(Yup.string()).min(2).max(2).required()
    })

    if (!(await schema.isValid({ type, gradient }))) {
      return res.status(400).json({ error: 'Validation failed' })
    }

    const deviceExists = await Device.exists({
      user: req.user,
      type
    })

    if (deviceExists) {
      return res.status(400).json({ error: 'Device already exists' })
    }

    const device = await Device.create({
      user: req.user,
      type,
      gradient
    })

    return res.json(device)
  }

  async update (req, res) {
    const { id } = req.params
    const { type, gradient } = req.body

    const schema = Yup.object().shape({
      type: Yup.string(),
      gradient: Yup.array().of(Yup.string()).min(2).max(2)
    })

    if (!(await schema.isValid({ type, gradient }))) {
      return res.status(400).json({ error: 'Validation failed' })
    }

    const updateDevice = await Device.findOne({
      user: req.user,
      _id: id
    })

    if (type !== updateDevice.type) {
      const deviceExists = await Device.findOne({
        user: req.user,
        type
      })

      if (deviceExists) {
        return res.status(400).json({ error: 'Device already exists' })
      }
    }

    const device = await Device.findOneAndUpdate(
      {
        user: req.user,
        _id: id
      },
      { type, gradient },
      { new: true, upsert: true }
    )

    return res.json(device)
  }

  async delete (req, res) {
    const { id } = req.params

    console.log(id, req.user)

    const device = await Device.findOneAndDelete({
      user: req.user,
      _id: id
    })

    console.log(device)

    return res.json(device)
  }
}

export default new DeviceController()
