exports.getWelcomeMessage = (req, res) => {
     res.json({ message: 'Welcome to the API', version: '1.0.0' });
};

exports.postData = (req, res) => {
     const { name, age } = req.body;
     res.json({ message: `Hello ${name}, you are ${age} years old!` });
};