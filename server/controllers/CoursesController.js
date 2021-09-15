import { Auth0Provider } from '@bcwdev/auth0provider'
import { coursesService } from '../services/CoursesService.js'
import BaseController from '../utils/BaseController'

export class CoursesController extends BaseController {
  constructor() {
    super('api/courses')
    this.router
      .get('', this.getAll)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:courseId/assignments', this.getAssignments)

      .use(Auth0Provider.hasRoles('Teacher')) // CAN JIMMY GET THROUGH

      .post('/:courseId/assignments', this.createAssignment)
      .put('/:courseId/assignments/:assignmentId',
        Auth0Provider.hasPermissions('edit:assignment'),
        this.editAssignment
      )

      .use(Auth0Provider.hasRoles('Admin')) // CAN JIMMY GET THROUGH
      .post('', this.create)
  }

  async getAll(req, res, next) {
    try {
      const courses = await coursesService.getCourses(req.query)
      return res.send(courses)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      const course = await coursesService.createCourse(req.body)
      res.send(course)
    } catch (error) {
      next(error)
    }
  }

  async getAssignments(req, res, next) {
    try {
      const assignments = await coursesService.getAssignments(req.params.courseId)
      res.send(assignments)
    } catch (error) {
      next(error)
    }
  }

  async createAssignment(req, res, next) {
    try {
      // REVIEW enforces the courseId to be the one from the url
      req.body.courseId = req.params.courseId
      const assignment = await coursesService.createAssignment(req.params.courseId, req.userInfo.id, req.body)
      res.send(assignment)
    } catch (error) {
      next(error)
    }
  }

  async editAssignment(req, res, next) {
    try {
      const course = await coursesService.createCourse(req.body)
      res.send(course)
    } catch (error) {
      next(error)
    }
  }
}
