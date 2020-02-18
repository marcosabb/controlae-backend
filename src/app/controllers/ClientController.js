import Device from '../models/Device'

class DeviceController {
  async index (req, res) {
    const devices = await Device.aggregate([
      {
        $group: {
          _id: '$type',
          order: { $first: '$order' },
          data: {
            $push: {
              _id: '$_id',
              brand: '$brand',
              control: '$control'
            }
          }
        }
      },
      { $sort: { order: 1 } }
    ])

    return res.json(devices)
  }
}

export default new DeviceController()
