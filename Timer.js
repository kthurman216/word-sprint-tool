export default class Timer {
    constructor(root) {
        root.innerHTML = Timer.getHTML();

        this.elem = {
            minutes: root.querySelector(".timer-minutes"),
            seconds: root.querySelector(".timer-seconds"),
            controls: root.querySelector(".timer-control"),
            reset: root.querySelector(".timer-reset"),
        };

        this.interval = null;
        this.remainingSeconds = 0;


        this.elem.controls.addEventListener("click", () => {
            if (this.interval === null) {
                this.start();
            }
            else {
                this.stop();
            }
        });

        this.elem.reset.addEventListener("click", () => {
            const inputTime = prompt("Enter number of minutes:");

            if (inputTime < 60) {
                this.stop();
                this.remainingSeconds = inputTime * 60;
                this.updateInterfaceTime();
            }
        });
    }

    updateInterfaceTime() {
        const minutes = Math.floor(this.remainingSeconds / 60);
        const seconds = this.remainingSeconds % 60;

        this.elem.minutes.textContent = minutes.toString().padStart(2, "0");
        this.elem.seconds.textContent = seconds.toString().padStart(2, "0");
    }

    updateInterfaceControls() {
        if (this.interval === null) {
            this.elem.controls.innerHTML = `<span class="material-icons">play_arrow</span>`;
            this.elem.controls.classList.add("timer-start");
            this.elem.controls.classList.remove("timer-stop");
            this.elem.controls.setAttribute('title', "Start Timer");

        }
        else {
            this.elem.controls.innerHTML = `<span class="material-icons">pause</span>`;
            this.elem.controls.classList.add("timer-stop");
            this.elem.controls.classList.remove("timer-start");
            this.elem.controls.setAttribute('title', "Pause Timer");

        }
    }

    start() {
        if (this.remainingSeconds === 0) {
            return;
        }

        this.interval = setInterval(() => {
            this.remainingSeconds--;
            this.updateInterfaceTime();

            if (this.remainingSeconds === 0) {
                this.stop();
                document.getElementById("alert").play();
            }
        }, 1000);

        this.updateInterfaceControls();
    }

    stop() {
        clearInterval(this.interval);
        this.interval = null;

        this.updateInterfaceControls();
    }

    static getHTML() {
        return `
            <span id="timer-icon" class="timer-part">
                <i class="material-icons">timer</i>
            </span>
            <span class="timer-part timer-minutes">00</span>
            <span class="timer-part">:</span>
            <span class="timer-part timer-seconds">00</span>
            <button class="timer-button timer-control timer-start" title="Start Timer">
                <i class="material-icons">play_arrow</i>
            </button>
            <button class="timer-button timer-reset" title="Set Timer">
                <i class="material-icons">access_time</i>
            </button>
        `;
    }
}