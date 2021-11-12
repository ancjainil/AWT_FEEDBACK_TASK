const insertFaculty = (req, res) => {
    let facultyId = req.body.facultyId;
    let facultyName = req.body.facultyName;
   

    let insertFacultyQuery = `INSERT INTO tblAdmissionInfo (universityName, courseName, countryName, admissionYear, studentId) 
        VALUES ('${facultyId}', '${facultyName}')`;

    return insertFacultyQuery;
}

module.exports = insertFaculty;