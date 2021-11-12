var tblFacultyInfo = `CREATE TABLE IF NOT EXISTS tblFacultyInfo(
    facultyId INT(50) NOT NULL,
    facultyName varchar(50) NOT NULL,
    PRIMARY KEY (facultyId)
);`

module.exports = tblFacultyInfo;