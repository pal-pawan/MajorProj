import dbConnect from '@/lib/dbConnect';
import UserModel, { PrepRoles } from '@/model/User';
import mongoose from 'mongoose';
import { User } from 'next-auth';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/options';

export async function POST(request: Request, response: Response) {
    try {
        await dbConnect();
        const requestData = await request.json();
        const preparingForRole: string = requestData.userSelectedRole;

        const session = await getServerSession(authOptions);
        const _user: User = session?.user;
        if (!session || !session.user) {
            return Response.json({
                success: false,
                message: 'Not authenticated'
            },
                { status: 401 }
            );
        }

        const userId = new mongoose.Types.ObjectId(_user._id);

        const user = await UserModel.findById(userId);
        if (!user) {
            return Response.json({
                success: false,
                message: 'user not found'
            },
                { status: 404 }
            );
        }
        const newPreparingRole = { roles: preparingForRole };
        user.preparingFor.push(newPreparingRole as PrepRoles);

        await user.save();

        return Response.json({
            success: true,
            message: 'new role added successfully',
            newPreparingRole
        },
            { status: 200 }
        )

    } catch (error) {
        console.log(error)
        return Response.json({
            success: false,
            message: 'Failed to add Role',
            error
        },
            { status: 500 }
        )
    };
};