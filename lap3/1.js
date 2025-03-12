let count = 0;
const intervalId = setInterval(() => {
    console.log(count);
    count++;
    if (count > 10) {
        clearInterval(intervalId);
    }
}, 1000);