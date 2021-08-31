class App {
    constructor($wrapper) {
        this.$wrapper = $wrapper;
        this.$wrapper.on('click', '.js-btn-next', this.getRandomDepartment.bind(this));
        this.$wrapper.on('click', '.js-btn-solution', this.displaySolution.bind(this));
        this.departments = [];
        this.currentDepartment = '';
    }

    init() {
        this.loadDepartments();
    }

    getRandomDepartment() {
        let randomDepartment = this.departments[Math.floor(Math.random() * this.departments.length)];
        this.currentDepartment = randomDepartment;
        console.log(randomDepartment, this.currentDepartment, this.departments);
        $('.js-btn-solution').removeClass('disabled');
        $('.department-name').addClass('invisible');
        $('.department-capital').addClass('invisible');
        $('.department-region').addClass('invisible');

        $('.department-number').html(this.currentDepartment.number);
        $('.department-name').html(this.currentDepartment.name);
        $('.department-capital').html(this.currentDepartment.capital);
        $('.department-region').html(this.currentDepartment.region);
    }

    displaySolution() {
        $('.department-name, .department-capital, .department-capital,.department-region').removeClass('invisible');
        $('.js-btn-solution').addClass('disabled');
    }

    loadDepartments() {
        $.ajax({
            url: '/data.json',
            method: 'GET',
        }).then((data) => {
            this.departments = data;
            console.log(this.departments);
            this.getRandomDepartment();
        })
    }
}

$(function () {
    $(document).ready(function () {
        let $wrapper = $('.js-app-wrapper');
        let app = new App($wrapper);
        app.init();
    });
});