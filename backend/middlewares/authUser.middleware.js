import jwt from "jsonwebtoken";

export default async function authUser(request, response, next) {
  const { token } = request.cookies;

  if (!token) {
    return response.json({ success: false, message: "Not Authorized." });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    if (tokenDecode.id) {
      request.body.userId = tokenDecode.id;
    } else {
      return response.json({ success: false, message: "Not Authorized." });
    }
    next();
  } catch (error) {
    return response.json({ success: false, message: error.message });
  }
}
