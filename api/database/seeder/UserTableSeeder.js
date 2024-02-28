import User from "../../models/User.js";
class UserTableSeeder {
    static async run() {
        let userData = {
            name: "Admin",
            email: "admin@gmail.com",
            password: "admin123",
            gender: "male",
            role: "admin",
            image: ""
        }
        let findUser = await User.findOne({ email: userData.email });
        if (!findUser) {
            let user = new User(userData);
            await user.save();
            console.log("Admin user created successfully");
        }
    }
}
export default UserTableSeeder;