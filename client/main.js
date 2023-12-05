var audioCtx;

async function test() {
  try {
    const response = await axios.get("http://127.0.0.1:8000/");
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

test();
