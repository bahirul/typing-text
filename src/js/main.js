class TxtType {
    constructor(el, data, interval) {
        this.data = data;
        this.el = el;
        this.startIndexData = 0;
        this.interval = parseInt(interval, 10) || 2000;
        this.txt = '';
        this.isDeleting = false;

        // run typing by default
        this.typing();
    }

    typing() {
        // use modulus for infinite loop when text done typing "index % length"
        let index = this.startIndexData % this.data.length

        let fullTxt = this.data[index]

        // check state in deleting or not
        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1)
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1)
        }

        // render to el
        this.el.innerHTML = this.txt;

        // refer to class it self
        let that = this;

        // delta is variable for 'interval' timeout
        let delta = 200 - Math.random() * 100;

        // fastest interval on deleting
        if (this.isDeleting) {
            delta /= 2;
        }

        if (!this.isDeleting && this.txt === fullTxt) {
            // set interval to default when finish typing (transition to deleting state)
            delta = this.interval
            this.isDeleting = true

            // set interval to 5000 when finish or resart typing to first index
            if (index + 1 == this.data.length) {
                delta = 5000
            }
        } else if (this.isDeleting && this.txt === '') {
            // set interval to 500 after deleting finish, and start new typing
            this.isDeleting = false
            this.startIndexData++
            delta = 500
        }

        // run typing based on delta
        setTimeout(function () {
            that.typing()
        }, delta);
    }
}

window.onload = function () {
    // type elements
    const elements = document.getElementsByClassName('typing__text');

    Array.from(elements).forEach(element => {
        // data text
        const data = element.getAttribute('data-text')

        // interval between typing
        const interval = element.getAttribute('data-interval')

        if (data) {
            new TxtType(element, JSON.parse(data), interval);
        }
    });
};