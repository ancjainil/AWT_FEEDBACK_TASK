const insertFaculty = (req, res) => {
    let facultyId = req.body.facultyId;
    let facultyName = req.body.facultyName;
   

    let insertFacultyQuery = `INSERT INTO tblFacultyInfo (facultyId, facultyName) 
        VALUES ('${facultyId}', '${facultyName}')`;

    return insertFacultyQuery;
}

module.exports = insertFaculty;