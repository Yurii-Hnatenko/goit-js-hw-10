document.addEventListener("DOMContentLoaded", function() {
    function isFutureDate(selectedDate) {
        const currentDate = new Date();
        return selectedDate > currentDate;
    }

    function convertMs(ms) {
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;
        const days = Math.floor(ms / day);
        const hours = Math.floor((ms % day) / hour);
        const minutes = Math.floor(((ms % day) % hour) / minute);
        const seconds = Math.floor((((ms % day) % hour) % minute) / second);
        return { days, hours, minutes, seconds };
    }
    const datePicker = flatpickr("#datetime-picker", {
        enableTime: true,
        time_24hr: true,
        defaultDate: new Date(),
        minuteIncrement: 1,
        onClose(selectedDates) {
            const selectedDate = selectedDates[0];
            if (!isFutureDate(selectedDate)) {
                iziToast.error({
                    title: 'Error',
                    message: 'Please choose a date in the future',
                });
                document.getElementById("start-btn").disabled = true;
            } else {
                document.getElementById("start-btn").disabled = false;
            }
        },
    });
    function addLeadingZero(value) {
        return value < 10 ? "0" + value : value;
    }
    function startTimer() {
        const selectedDate = datePicker.selectedDates[0];
        const timerInterval = setInterval(() => {
            const currentDate = new Date();
            const remainingTime = selectedDate - currentDate;

            if (remainingTime <= 0) {
                clearInterval(timerInterval);
                document.getElementById("days").textContent = "00";
                document.getElementById("hours").textContent = "00";
                document.getElementById("minutes").textContent = "00";
                document.getElementById("seconds").textContent = "00";
                return;
            }

            const { days, hours, minutes, seconds } = convertMs(remainingTime);
            document.getElementById("days").textContent = addLeadingZero(days);
            document.getElementById("hours").textContent = addLeadingZero(hours);
            document.getElementById("minutes").textContent = addLeadingZero(minutes);
            document.getElementById("seconds").textContent = addLeadingZero(seconds);
        }, 1000);
    }
    document.getElementById("start-btn").addEventListener("click", startTimer);
});
