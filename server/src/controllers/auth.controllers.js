export const signup = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const result = await req.authDb.createUser({ username, password });

    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

export const signin = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const result = await req.authDb.verifyCredentials({ username, password });
    if (!result.success) return res.status(401).json(result);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};
