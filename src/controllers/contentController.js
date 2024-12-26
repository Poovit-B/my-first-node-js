
const mongoose = require('mongoose');
const User = require('../models/userModel');
const Content = require('../models/contentModel');
const { paginateAndSort, paginateResult } = require('../utils/paginate');

exports.createContent = async (req, res) => {
    try {
        const userId = req.user?.id
        if (!userId) {
            return res.status(404).send({ message: "userId not found" });
        }
        const { title, desc, content } = req.body; // ข้อมูลที่จะอัปเดตจาก Body
        const data = new Content({
            title,
            desc,
            content,
            created_by: userId,
            created_at: Date.now(), // ตั้งค่าวันที่สร้าง
            updated_at: Date.now() // ตั้งค่าวันที่อัปเดต
        });

        await data.save();

        res.status(201).send({ success: true, data: data });
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getContents = async (req, res) => {
    try {
        let { keyword, user_id } = req.query;
        let query = {
            ...(keyword && { title: { $regex: keyword, $options: 'i' } }),
        };

        if (mongoose.isValidObjectId(user_id)) {
            query.user_id = { created_by: user_id }
        } else if (user_id) {
            res.status(404).send({ message: "userId not found" });
        }

        let aggregate = [
            ...paginateAndSort(req.query),
            { $match: query },
            {
                $lookup: {
                    from: 'users',
                    localField: 'created_by',
                    foreignField: '_id',
                    as: 'user_info'
                }
            },
            { $unwind: { path: '$user_info', preserveNullAndEmptyArrays: true } },
            {
                $facet: {
                    data: [
                        {
                            $project: {
                                title: 1,
                                desc: 1,
                                content: 1,
                                created_at: 1,
                                updated_at: 1,
                                is_active: 1,
                                created_by: 1,
                                user_info: {
                                    _id: '$user_info._id',
                                    name: '$user_info.name',
                                    email: '$user_info.email',
                                    age: '$user_info.age',
                                }
                            }
                        }
                    ],
                    totalCount: [ // Total count of documents
                        { $count: 'count' }
                    ]
                }
            }
        ]
        const [result] = await Content.aggregate(aggregate)
        const { page, sort } = paginateResult(req.query, result)
        res.status(200).send({
            success: true,
            data: result?.data,
            page,
            sort,
        });

    } catch (error) {
        console.log('error', error)
        res.status(500).send(error);
    }
};
