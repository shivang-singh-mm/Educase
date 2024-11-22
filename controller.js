const db = require('./dbConfig')

const addSchools = (req, res) => {
    const data = {
        name: req.body.name,
        address: req.body.address,
        latitude: req.body.latitude,
        longitude: req.body.longitude
    }
    try {
        const query = 'INSERT INTO user.schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
        db.query(query, [data.name, data.address, data.latitude, data.longitude], (err, result) => {
            if (err) {
                console.error('Error adding school:', err);
                return res.status(500).json({ error: 'Database error.' });
            }
            res.status(201).json({ message: 'School added successfully!', userId: result.insertId });
        });
    }
    catch (err) {
        console.log(err);
        return res.status(401).json({ success: false, message: "Error in adding school" });
    }
}


const getSchools = (req, res) => {
    const data = {
        latitude: req.params.latitude,
        longitude: req.params.longitude
    }
    try {
        const query = `
                        SELECT 
                          name, 
                          address, 
                          latitude, 
                          longitude,
                          (
                            6371 * ACOS(
                              COS(RADIANS(?)) * COS(RADIANS(latitude)) *
                              COS(RADIANS(longitude) - RADIANS(?)) +
                              SIN(RADIANS(?)) * SIN(RADIANS(latitude))
                            )
                          ) AS distance
                        FROM user.schools
                        ORDER BY distance ASC;
                        `;



        db.query(query, [data.latitude, data.longitude, data.latitude], (err, result) => {
            if (err) {
                console.error('Error fetching schools:', err);
                return res.status(500).json({ error: 'Database error.' });
            }
            res.status(201).json({ message: 'Schools fetched successfully!', body: result });
        });
    }
    catch (err) {
        console.log(err);
        return res.status(401).json({ success: false, message: "Error in fetching schools" });
    }
}

module.exports = {
    addSchools,
    getSchools
}