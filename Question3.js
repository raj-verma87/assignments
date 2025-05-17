db.sales.aggregate([
    { 
      $unwind: "$items" 
    },
    
    // added fields month and itemRevenue
    { 
      $addFields: {
        month: { $dateToString: { format: "%Y-%m", date: "$date" } },
        itemRevenue: { $multiply: ["$items.quantity", "$items.price"] }
      }
    },
  
    // group by store and month
    {
      $group: {
        _id: { store: "$store", month: "$month" },
        totalRevenue: { $sum: "$itemRevenue" },
        totalPrice: { $sum: "$items.price" },
        itemCount: { $sum: 1 }
      }
    },
  
    // calculate average and shape output
    {
      $project: {
        _id: 0,
        store: "$_id.store",
        month: "$_id.month",
        totalRevenue: 1,
        averagePrice: { $divide: ["$totalPrice", "$itemCount"] }
      }
    },

    {
      $sort: { store: 1, month: 1 }
    }
  ]);
  