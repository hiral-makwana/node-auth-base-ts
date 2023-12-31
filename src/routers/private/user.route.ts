import { Router } from 'express';
import * as userController from '../../controller/user.controller';
import userValidator from '../../validator/user.validator';
import { upload } from '../../helper/media.helper';

const router = Router();

/** Get all users */
router.get('/list', userController.getListOfUser);

/** Change Password after login */
router.post('/change-password', userValidator.changePassword(), userController.changePassword);

/** Check validations */
router.post('/check-validation', userValidator.checkValid(), userController.checkValidation);

/** Delete user API */
router.delete('/delete-user/:userId', userController.deleteUser);

/** HTML to String */
router.post('/html-to-string', userController.convertHtmlToString);

/** Upload Profile */
router.post('/profile-upload/:userId', upload.single('avatar'), userController.profileUpload);

export default router;

/**
* @swagger
* /list:
*   get:
*     summary: Get a list of users
*     tags: [User]
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: header
*         name: Accept-Language
*         description: The preferred language for the response.
*         required: false
*         schema:
*           type: string
*     responses:
*       200:
*         description: Successful response with a list of users
*         content:
*           application/json:
*             example:
*               status: true
*               message: Users fetched successfully
*               data:
*                 - userId: 1
*                   username: user1
*                 - userId: 2
*                   username: user2
*                 # Add more user objects as needed
*       400:
*         description: Bad request or error while fetching users
*         content:
*           application/json:
*             example:
*               status: false
*               message: Error message describing the issue
*/
/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     tags: [User]
 *     parameters:
 *       - in: header
 *         name: Accept-Language
 *         description: The preferred language for the response.
 *         required: false
 *         schema:
 *           type: string
 *     requestBody:
 *       description: User email and password
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             email: john.doe@example.com
 *             password: userPassword123
 *     responses:
 *       200:
 *         description: Successful login response with user information and token
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: Login successfully.
 *               data:
 *                 userId: 123
 *                 email: john.doe@example.com
 *                 token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzLCJlbWFpbCI6ImpvaG4uZG9lQGV4YW1wbGUuY29tIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *       401:
 *         description: Invalid email or password
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: Invalid email or password
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: Internal server error.
 */
/**
* @swagger
* /changePassword:
*   post:
*     summary: Change user password after login
*     tags: [User]
*     parameters:
*       - in: header
*         name: Accept-Language
*         description: The preferred language for the response.
*         required: false
*         schema:
*           type: string
*     security:
*       - bearerAuth: []
*     requestBody:
*       description: Old and new password
*       required: true
*       content:
*         application/json:
*           example:
*             oldPassword: userPassword123
*             newPassword: newPassword123
*     responses:
*       200:
*         description: Password change successful
*         content:
*           application/json:
*             example:
*               status: true
*               message: Password change successfully.
*       401:
*         description: Invalid old password or new password matches the old password
*         content:
*           application/json:
*             example:
*               status: false
*               message: Invalid or Match password.
*       500:
*         description: Internal server error
*         content:
*           application/json:
*             example:
*               status: false
*               message: Internal server error.
*/
/**
* @swagger
* /checkValidation:
*   post:
*     summary: Check if a value exists in the database
*     tags: [User]
*     parameters:
*       - in: header
*         name: Accept-Language
*         description: The preferred language for the response.
*         required: false
*         schema:
*           type: string
*     security:
*       - bearerAuth: []
*     requestBody:
*       description: Validation data
*       required: true
*       content:
*         application/json:
*           example:
*             key: email
*             value: john.doe@example.com
*     responses:
*       200:
*         description: Validation successful
*         content:
*           application/json:
*             example:
*               status: true
*               message: Validation successful
*       400:
*         description: Validation failed
*         content:
*           application/json:
*             example:
*               status: false
*               message: Value already exists in the database
*       500:
*         description: Server error
*         content:
*           application/json:
*             example:
*               status: false
*               message: Server error message
*/
/**
* @swagger
* tags:
*   name: Authentication
*   description: Authentication APIs
* /deleteUser/{userId}:
*   delete:
*     summary: Delete a user by ID
*     tags: [User]
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: header
*         name: Accept-Language
*         description: The preferred language for the response.
*         required: false
*         schema:
*           type: string
*       - in: path
*         name: userId
*         required: true
*         description: ID of the user to be deleted
*         schema:
*           type: integer
*     responses:
*       200:
*         description: User deleted successfully
*         content:
*           application/json:
*             example:
*               status: true
*               message: User deleted successfully
*       400:
*         description: User not found
*         content:
*           application/json:
*             example:
*               status: false
*               message: User not found
*       404:
*         description: User not found
*         content:
*           application/json:
*             example:
*               status: false
*               message: User not found
*       500:
*         description: Server error
*         content:
*           application/json:
*             example:
*               status: false
*               message: Server error message
*/
/**
* @swagger
* tags:
*   name: User
*   description: User-related APIs
* /upload/{userId}:
*   post:
*     summary: Upload profile image for a user
*     tags: [User]
*     parameters:
*       - in: path
*         name: userId
*         description: ID of the user
*         required: true
*         schema:
*           type: integer
*     security:
*       - bearerAuth: []
*     requestBody:
*       description: Profile image to upload
*       required: true
*       content:
*         multipart/form-data:
*           schema:
*             type: object
*             properties:
*               profileImage:
*                 type: string
*                 format: binary
*     responses:
*       200:
*         description: Successful response with profile image details
*         content:
*           application/json:
*             example:
*               status: true
*               message: Profile image uploaded successfully
*               data: http://example.com/uploads/user123_profile.jpg
*       400:
*         description: Bad request or image not selected
*         content:
*           application/json:
*             example:
*               status: false
*               message: Image not selected
*       404:
*         description: User not found
*         content:
*           application/json:
*             example:
*               status: false
*               message: User not found
*       500:
*         description: Internal server error
*         content:
*           application/json:
*             example:
*               status: false
*               message: Server error during image upload
*/
/**
 * @swagger
 * tags:
 *   name: HTML
 *   description: HTML Conversion APIs
 * /htmlToString:
 *   post:
 *     summary: Convert HTML to string
 *     tags: [HTML]
 *     parameters:
 *       - in: header
 *         name: Accept-Language
 *         description: The preferred language for the response.
 *         required: false
 *         schema:
 *           type: string
 *     requestBody:
 *       description: HTML content to be converted
 *       required: true
 *       content:
 *         text/html:
 *           example: "<html><body><h1>Hello, World!</h1></body></html>"
 *     responses:
 *       200:
 *         description: Successful response with converted text
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: HTML converted successfully
 *               data: "<html><body><h1>Hello, World!</h1></body></html>"
 *       400:
 *         description: Bad request, HTML content is required
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: HTML content is required.
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Server error while converting HTML
 */
// /**
//  * @swagger
//  * tags:
//  *   name: Config
//  *   description: Email Configuration
//  * /updateEmailConfig:
//  *   put:
//  *     summary: Update email configuration
//  *     tags: [Config]
//  *     parameters:
//  *       - in: header
//  *         name: Accept-Language
//  *         description: The preferred language for the response.
//  *         required: false
//  *         schema:
//  *           type: string
//  *     requestBody:
//  *       description: New configuration data
//  *       required: true
//  *       content:
//  *         application/json:
//  *           example:
//  *             host: smtp.example.com
//  *             port: 587
//  *             user: your_username
//  *             pass: your_password
//  *     responses:
//  *       200:
//  *         description: Successful response with update status
//  *         content:
//  *           application/json:
//  *             example:
//  *               success: true
//  *               message: Config updated successfully
//  *       500:
//  *         description: Internal server error
//  *         content:
//  *           application/json:
//  *             example:
//  *               success: false
//  *               message: Error updating config
//  */
// export const updateConfig = async (req: any, res: any) => {
//     try {
//         const newConfig = req.body;

//         const result = updateEmailConfig(newConfig);

//         if (result.status == true) {
//             res.status(200).json({ success: true, message: result.message });
//         } else {
//             res.status(500).json({ success: false, message: result.message });
//         }
//     } catch (e) {
//         console.error(e);
//         return res.status(500).json({
//             status: false,
//             message: res.__("SERVER_ERR") + e.message,
//         });
//     }
// }