const express = require("express");
const app = express();
const port = 3000;
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());

app.post("/sendmail", (req, res) => {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      service: "gmail",
      secure: true,
      auth: {
        user: process.env.USER_MAIL, // generated ethereal user
        pass: process.env.USER_PASS, // generated ethereal password
      },
    });
    const mailOptions = {
      from: req.body.frommail,
      to: req.body.tomail,
      subject: "Important Email Recieve",
      text: "Important Email Recieve",
      html: `
<body style="background-color:grey">
	<table align="center" border="0" cellpadding="0" cellspacing="0"
		width="550" bgcolor="white" style="border:2px solid black">
		<tbody>
			<tr>
				<td align="center">
					<table align="center" border="0" cellpadding="0"
						cellspacing="0" class="col-550" width="550">
						<tbody>
							<tr>
								<td align="center" style="background-color: #4cb96b;
										height: 50px;">

									<a href="#" style="text-decoration: none;">
										<p style="color:white;
												font-weight:bold;">
											Email Recieve
										</p>
									</a>
								</td>
							</tr>
						</tbody>
					</table>
				</td>
			</tr>

			<tr style="display: inline-block;">
				<td style="height: 150px;
						padding: 20px;
						border: none;
						border-bottom: 2px solid #361B0E;
						background-color: white;">
					
					<h2 style="text-align: left;
							align-items: center;">
						Email Recieve From ${req.body.frommail}
				</h2>
					<p class="data"
					style="text-align: justify-all;
							align-items: center;
							font-size: 15px;
							padding-bottom: 12px;">${req.body.message}
					</p>
					<p>
					</p>
				</td>
			</tr>
		</tbody>
	</table>
</body>


    `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        res.send("email send");
        console.log("Email sent:" + info.response);
      }
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/", (req, res) => {
  res.send("server running");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
