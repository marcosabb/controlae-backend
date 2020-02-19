import * as Yup from 'yup'

import Device from '../models/Device'

class DashboardController {
  async index (req, res) {
    const devices = await Device
      .find({ user: req.user })
      .sort({ order: 1 })

    return res.json(devices)
  }

  async show (req, res) {
    const { id } = req.params

    const device = await Device.find({
      user: req.user,
      _id: id
    })

    return res.json(device)
  }

  async store (req, res) {
    const { order, type, brand, control } = req.body

    const schema = Yup.object().shape({
      type: Yup.string().required(),
      order: Yup.string().required(),
      brand: Yup.string().required(),
      control: Yup.object().shape().required()
    })

    if (!(await schema.isValid({ order, type, brand, control }))) {
      return res.status(400).json({ error: 'Validation failed' })
    }

    const deviceExists = await Device.exists({
      user: req.user,
      type,
      brand
    })

    if (deviceExists) {
      return res.status(400).json({ error: 'Device already exists' })
    }

    const device = await Device.create({
      user: req.user,
      order,
      type,
      brand,
      control
    })

    return res.json(device)
  }

  async update (req, res) {
    const { id } = req.params
    const { order, type, brand, control } = req.body

    const schema = Yup.object().shape({
      type: Yup.string().required(),
      order: Yup.string().required(),
      brand: Yup.string().required(),
      control: Yup.object().shape()
    })

    if (!(await schema.isValid({ order, type, brand, control }))) {
      return res.status(400).json({ error: 'Validation failed' })
    }

    const updateDevice = await Device.findOne({
      user: req.user,
      _id: id
    })

    if (type !== updateDevice.type || brand !== updateDevice.brand) {
      const deviceExists = await Device.findOne({
        user: req.user,
        type,
        brand
      })

      if (deviceExists) {
        return res.status(400).json({ error: 'Device already exists' })
      }
    }

    const device = await Device.findOneAndUpdate(
      { user: req.user, _id: id },
      { order, type, brand, control },
      { new: true, upsert: true }
    )

    return res.json(device)
  }

  async delete (req, res) {
    const { id } = req.params

    const device = await Device.findOneAndDelete(
      {
        user: req.user,
        _id: id
      }
    )

    return res.json(device)
  }
}

export default new DashboardController()
