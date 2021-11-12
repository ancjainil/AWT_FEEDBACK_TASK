var tblfeedbackInfo = `CREATE TABLE IF NOT EXISTS tblfeedbackInfo(
    feedbackId varchar(100) NOT NULL,
    facultyId INT(50) NOT NULL,
    Q1 varchar(50) NOT NULL,
    Q2 varchar(50) NOT NULL,
    Q3 varchar(50) NOT NULL,
    Q4 varchar(50) NOT NULL,
    Q5 varchar(50) NOT NULL,
    Q6 varchar(50) NOT NULL,
    FOREIGN KEY (facultyId) REFERENCES tblFacultyInfo(facultyId),
    PRIMARY KEY (feedbackId)
);`

module.exports = tblfeedbackInfo;