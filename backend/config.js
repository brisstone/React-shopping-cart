
MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost/brisstoneStore';
JWT_SECRET = process.env.JWT_SECRET || 'somethingsec'

module.exports = {MONGODB_URL, JWT_SECRET};