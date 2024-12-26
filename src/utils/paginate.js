
const paginateAndSort = (query) => {

     let { page = 1, per_page = 10, sort_by = 'created_at', order_by = 'order_by', } = query;

     const pageNumber = parseInt(page, 10);
     const limitNumber = parseInt(per_page, 10);
     const sortOrder = order_by.toUpperCase() === 'ASC' ? 1 : -1;
     const skip = (pageNumber - 1) * limitNumber;

     return [
          { $sort: { [sort_by]: sortOrder } }, // คำนวณค่า skip
          { $skip: skip },  // คำนวณค่า skip
          { $limit: limitNumber }
     ]
};

const paginateResult = (query, result) => {

     let { page = 1, per_page = 10, sort_by = 'created_at', order_by = 'order_by', } = query;
     const pageNumber = parseInt(page, 10);
     const limitNumber = parseInt(per_page, 10);
     const skip = (pageNumber - 1) * limitNumber;

     const total = result?.totalCount?.[0]?.count || 0

     return {
          page: {
               current_page: pageNumber,
               from: skip + 1,
               to: Math.min(skip + limitNumber, total),
               per_page: limitNumber,
               last_page: Math.ceil(total / limitNumber),
               total: total
          },
          sort: {
               sort_by,
               order_by
          }
     };
};

module.exports = { paginateAndSort, paginateResult };
