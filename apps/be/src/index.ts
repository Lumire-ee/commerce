import express, { Request, Response } from "express";
import cors from "cors";
import { prisma } from "@repo/database";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// 헬스체크 엔드포인트
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "ok", timestamp: new Date() });
});

// Postman 테스트용 유저 조회 API
app.get("/api/users", async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Database Query Error" });
  }
});

app.listen(PORT, () => {
  console.log(`BE Server running on http://localhost:${PORT}`);
});
