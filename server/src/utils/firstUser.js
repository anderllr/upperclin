import { db } from "../models";
import { ADMIN_PASSWORD, ADMIN_EMAIL, ADMIN_USER } from "../utils/utils";

const { User } = db;

const adminUser = {
	name: "Administrador do Sistema",
	userName: ADMIN_USER,
	app: true,
	web: true,
	email: ADMIN_EMAIL,
	password: ADMIN_PASSWORD
};

const existUser = async () => {
	const user = await User.find({ userName: ADMIN_USER });
	return user.length > 0;
};

export const verifyAdmin = async () => {
	const exist = await existUser();
	if (!exist) {
		User(adminUser).save();
	}
};
