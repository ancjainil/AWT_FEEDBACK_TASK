const insertfeedback = (req, res) => {
    let feedbackId = req.body.feedbackId;
    let facultyId = req.body.facultyId;
    let Q1 = req.body.Q1;
    let Q2 = req.body.Q2;
    let Q3 = req.body.Q3;
    let Q4 = req.body.Q4;
    let Q5 = req.body.Q5;
    let Q6 = req.body.Q6;

    let insertfeedbackQuery = `INSERT INTO tblCompetitiveExam (greScore, ieltsScore, toeflScore, gmatScore, studentId) 
        VALUES ('${feedbackId}', '${facultyId}', '${Q1}', '${Q2}', '${Q3}', '${Q4}', '${Q5}', '${Q6}')`;

    return insertfeedbackQuery;
}

module.exports = insertfeedback;