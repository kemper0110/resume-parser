var express = require('express');
var router = express.Router();
var pool = require('../db/pg');

/* GET users listing. */
router.get('', async function (req, res) {
    try {
        const client = await pool.connect();
        const {rows: resumes} = await client.query("SELECT id, link, fullname, phone, email FROM resumes");
        client.release();
        res.send(resumes);
    } catch (e) {
        res.status(400).send(e.message);
    }
});
router.get('/:resume_id', async function (req, res) {
    try {
        const client = await pool.connect();
        const {resume_id} = req.params;
        const {rows, rowCount} = await client.query("SELECT * FROM resumes WHERE id = $1", [resume_id]);
        client.release();
        if (rowCount === 0)
            throw new Error("Resume not found");
        const [resume] = rows;
        res.send(resume);
    } catch (e) {
        res.status(400).send(e.message);
    }
})
router.delete('/:resume_id', async function (req, res) {
    try {
        const client = await pool.connect();
        const {resume_id} = req.params;
        const {rows, rowCount} = await client.query("DELETE FROM resumes WHERE id = $1", [resume_id]);
        client.release();
        if (rowCount === 0)
            throw new Error("Resume not found");
        res.send()
    } catch (e) {
        res.status(400).send(e.message);
    }
})
router.put('', async function (req, res) {
    try{
        const client = await pool.connect();
        const resume = req.body;
        const {rows, rowCount} = await client.query(
            "UPDATE resumes SET link=($1), fullname=($2), phone=($3), email=($4), experience=($5), education=($6) WHERE id=($7)",
            [resume.link, resume.fullname, resume.phone, resume.email, resume.experience, resume.education, resume.id]);
        client.release();
        if (rowCount === 0)
            throw new Error("Resume not updated");
        res.send()
    } catch (e) {
        res.status(400).send(e.message);
    }
})
router.post('', async function (req, res) {
    try {
        const client = await pool.connect();
        const resume = req.body;
        const {rows, rowCount} = await client.query(
            "INSERT INTO resumes(link, fullname, phone, email, experience, education)" +
            "VALUES($1, $2, $3, $4, $5, $6) returning id", [resume.link, resume.fullname, resume.phone,
                resume.email, resume.experience, resume.education]);
        client.release();
        if (rowCount === 0)
            throw new Error("Resume not inserted");
        const {id} = rows[0];
        res.send("" + id);
    } catch (e) {
        console.log(e.message);
        res.status(400).send(e.message);
    }
})


module.exports = router;
