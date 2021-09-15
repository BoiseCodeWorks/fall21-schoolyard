import { accountService } from '../services/AccountService.js'
import BaseController from '../utils/BaseController.js'

export class ProfilesController extends BaseController {
  constructor() {
    super('api/profiles')
    this.router
      .get('', this.getProfiles)
  }

  async getProfiles(req, res, next) {
    try {
      const profiles = await accountService.findProfiles(req.query.q)
      res.send(profiles)
    } catch (error) {
      next(error)
    }
  }
}
