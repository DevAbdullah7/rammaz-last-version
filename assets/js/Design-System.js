// Scrolling Top Arrow
window.addEventListener('scroll', () => {
    if (document.querySelector('body .main .topArrow')) {
        if (400 < window.scrollY) {
            document.querySelector('body .main .topArrow').classList.add('active')
        } else {
            document.querySelector('body .main .topArrow').classList.remove('active')
        }
    }
})

// Buttons
// Taps Buttons
function tabsButtonHandling(btn) {
    const buttons = btn.parentNode.children
    const Type = btn.attributes.type.value
    for(let i=0; i < buttons.length; i++) {
        buttons[i].classList.remove('active')
    }
    btn.classList.add('active')
    btn.parentNode.setAttribute('Type', Type)
}

// Toggles
function togglesHandelling(toggle) {
    if (toggle.parentNode.classList.contains('active')) {
        toggle.parentNode.classList.remove('active')
    } else {
        toggle.parentNode.classList.add('active')
    }
}

// CheckBoxes
function checkBoxesHandelling(checkBox) {
    if (checkBox.parentNode.classList.contains('active')) {
        checkBox.parentNode.classList.remove('active')
    } else {
        checkBox.parentNode.classList.add('active')
    }
}

// Radios
function radiosHandelling(radio) {
    if (radio.parentNode.classList.contains('active')) {
        radio.parentNode.classList.remove('active')
    } else {
        radio.parentNode.classList.add('active')
    }
}

// Pagination
function paginationNumbersHandelling(number) {
    const numbers = number.parentNode.children
    for (const num of numbers) {
        num.classList.remove('active')
    }
    number.classList.add('active')
}
function prevPaginationNumbers(eleNum, parent) {
    const num = Number(eleNum)
    const parentElements = parent.querySelector('.paginationNumbers').children

    for (const element of parentElements) {
        element.classList.remove('active')

        if ((num - 1) > 0) {
            if (element.innerHTML == (num - 1)) {
                element.classList.add('active')
            }
        } else {
            parentElements[0].classList.add('active')
        }
    }
}
function nextPaginationNumbers(eleNum, parent) {
    const num = Number(eleNum)
    const parentElements = parent.querySelector('.paginationNumbers').children
    const lastElement = parent.querySelector('.paginationNumbers').lastElementChild

    for (const element of parentElements) {
        element.classList.remove('active')

        if ((num + 1) < Number(lastElement.innerHTML)) {
            if (element.innerHTML == (num + 1)) {
                element.classList.add('active')
            }
        } else {
            lastElement.classList.add('active')
        }
    }
}

// Search
function searchInputHandlling(input) {
    if (input.value.length > 0) {
        input.parentNode.classList.add('has-text');
    } else {
        input.parentNode.classList.remove('has-text');
    }
}

// Taps 
// Frist Design
function tapsHandlling(tap) {
    if (tap.parentNode.classList.contains('active')) {
        tap.parentNode.classList.remove('active')
    } else {
        tap.parentNode.classList.add('active')
    }
}

// Second Design
function tapHandlling(control) {
    const tapControls = control.parentNode.querySelectorAll('.control')
    const tapStages = control.parentNode.parentNode.querySelector('.tapContent').querySelectorAll('.tap')

    const tapStage = control.getAttribute('tap')
    
    tapControls.forEach(control => {
        control.classList.remove('active')
    });
    control.classList.add('active')

    tapStages.forEach(item => {
        item.classList.remove('active')

        if (item.getAttribute('tap') == tapStage) {
            item.classList.add('active')
        }
    })
}

// Password Handlling
function passwordInpHandlling(passToggle) {
    const passwordInput = passToggle.parentNode.firstElementChild;

    // Showen Password
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);

    // Changing password hiding icon
    if (type == 'password') {
        passToggle.querySelector('use').setAttribute('href', './assets/icons.svg#eye')
    } else if (type == 'text') {
        passToggle.querySelector('use').setAttribute('href', './assets/icons.svg#eye-off')
    }
}

// Inputs Handlling
function inputHandlling(input) {
    if (input.value.length > 0) {
        input.classList.add('has-text');
    } else {
        input.classList.remove('has-text');
    }
}

// Color Input
function colorInputHandlling(input) {
    const colorPicker = input.parentNode.querySelector("input[type='color']");
    const colorText = input.parentNode.querySelector("input[type='text']");

    // Putting Color Value By Text
    if (input.type == "text") {
        if(/^#([0-9A-F]{3}){1,2}$/i.test(colorText.value)){
            colorPicker.value = colorText.value;
        }
    }

    // Putting Color Value By Color Pick
    if (input.type == "color") {
        colorText.value = colorPicker.value;
    }
}

// calendars
function updateCalendar(calendar) {
    const monthYearElement = calendar.querySelector('.header .monthYear')
    const datesElement = calendar.querySelector('.dates')
    
    // calendar Time Handling, this should be discussing with the team.
    let currentDate = ''
    if (calendar.attributes.calTime.value <= 0) {
        currentDate = new Date()
    } else {
        currentDate = new Date(calendar.attributes.calTime.value)
    }

    // set the date input default value by today date as default value
    if (calendar.parentNode.classList.contains('input')) {
        const dateInput = calendar.parentNode.querySelector('input[type=date]')
        if (dateInput.value == "") {
            const theDay = String(currentDate.getDate()).length < 2 ? `0${currentDate.getDate()}` : String(currentDate.getDate())
            const theMonth = String(currentDate.getMonth()+1).length < 2 ? `0${currentDate.getMonth()+1}` : String(currentDate.getMonth()+1)
            const theYear = String(currentDate.getFullYear());
            const inputValue = theDay + "-" + theMonth + "-" + theYear;
            const parts = inputValue.split('-');
            const formattedValue = `${parts[2]}-${parts[1]}-${parts[0]}`;
            dateInput.value = formattedValue
        }
    }
    

    const currentYear = currentDate.getFullYear()
    const currentMonth = currentDate.getMonth()
    const fristDay = new Date(currentYear, currentMonth, 0)
    const lastDay = new Date(currentYear, currentMonth + 1, 0)
    const totalDayes = lastDay.getDate()
    const fristDayIndex = fristDay.getDay()
    const lastDayIndex = lastDay.getDay()

    const monthYearString = currentDate.toLocaleString('default', {month: 'long', year: 'numeric'})
    monthYearElement.textContent = monthYearString

    let datesHTML = ''

    for(let i = fristDayIndex; i > 0; i--) {
        const prevDate = new Date(currentYear, currentMonth, 0 - i + 1)
        datesHTML += `<div class="date inactive" onclick="
        if (this.parentNode.parentNode.parentNode.classList.contains('input')) {
            if (String(${currentMonth}).length < 2) {
                if (String(${prevDate.getDate()}).length < 2) {
                    this.parentNode.parentNode.parentNode.children[1].children[0].value = String(${currentYear}) + '-' + 0 + String(${currentMonth}) + '-' + 0 + String(${prevDate.getDate()})
                } else {
                    this.parentNode.parentNode.parentNode.children[1].children[0].value = String(${currentYear}) + '-' + 0 + String(${currentMonth}) + '-' + String(${prevDate.getDate()})
                }
            } else {
                if (String(${prevDate.getDate()}).length < 2) {
                    this.parentNode.parentNode.parentNode.children[1].children[0].value = String(${currentYear}) + '-' + String(${currentMonth}) + '-' + 0 + String(${prevDate.getDate()})
                } else {
                    this.parentNode.parentNode.parentNode.children[1].children[0].value = String(${currentYear}) + '-' + String(${currentMonth}) + '-' + String(${prevDate.getDate()})
                }
            }
            this.parentNode.parentNode.classList.remove('active')
        } else {
            
        }
        ">${prevDate.getDate()}</div>`
    }

    for(let i = 1; i <= totalDayes; i++) {
        const date = new Date(currentYear, currentMonth, i)
        const activeClass = date.toDateString() === new Date().toDateString() ? 'active' : ''

        datesHTML += `<div class="date ${activeClass}" onclick="
        if (this.parentNode.parentNode.parentNode.classList.contains('input')) {
            if (String(${currentMonth + 1}).length < 2) {
                if (String(${i}).length < 2) {
                    this.parentNode.parentNode.parentNode.children[1].children[0].value = String(${currentYear}) + '-' + 0 + String(${currentMonth + 1}) + '-' + 0 + String(${i})
                } else {
                    this.parentNode.parentNode.parentNode.children[1].children[0].value = String(${currentYear}) + '-' + 0 + String(${currentMonth + 1}) + '-' + String(${i})
                }
            } else {
                if (String(${i}).length < 2) {
                    this.parentNode.parentNode.parentNode.children[1].children[0].value = String(${currentYear}) + '-' + String(${currentMonth + 1}) + '-' + 0 + String(${i})
                } else {
                    this.parentNode.parentNode.parentNode.children[1].children[0].value = String(${currentYear}) + '-' + String(${currentMonth + 1}) + '-' + String(${i})
                }
            }
            this.parentNode.parentNode.classList.remove('active')
        } else {
            
        }
        ">${i}</div>`
    }

    for(let i = 1; i <= 7 - lastDayIndex; i++) {
        const nextDate = new Date(currentYear, currentMonth + 1, i)

        datesHTML += `<div class="date inactive" onclick="
        if (this.parentNode.parentNode.parentNode.classList.contains('input')) {
            if (String(${currentMonth + 2}).length < 2) {
                if (String(${nextDate.getDate()}).length < 2) {
                    this.parentNode.parentNode.parentNode.children[1].children[0].value = String(${currentYear}) + '-' + 0 + String(${currentMonth + 2}) + '-' + 0 + String(${nextDate.getDate()})
                } else {
                    this.parentNode.parentNode.parentNode.children[1].children[0].value = String(${currentYear}) + '-' + 0 + String(${currentMonth + 2}) + '-' + String(${nextDate.getDate()})
                }
            } else {
                if (String(${nextDate.getDate()}).length < 2) {
                    this.parentNode.parentNode.parentNode.children[1].children[0].value = String(${currentYear}) + '-' + String(${currentMonth + 2}) + '-' + 0 + String(${nextDate.getDate()})
                } else {
                    this.parentNode.parentNode.parentNode.children[1].children[0].value = String(${currentYear}) + '-' + String(${currentMonth + 2}) + '-' + String(${nextDate.getDate()})
                }
            }
            this.parentNode.parentNode.classList.remove('active')
        } else {
            
        }
        ">${nextDate.getDate()}</div>`
    }

    datesElement.innerHTML = datesHTML
    calendar.setAttribute('calTime', currentDate)
}
// Run calendars
window.addEventListener('load', () => {
    const calendars = document.querySelectorAll('.calendar')
    for (const calendar of calendars) {
        updateCalendar(calendar)
    }
})

// Copy Elements Functionality
function copyElement(ele) {
    const code = ele.parentNode.querySelector('pre')
    const range = document.createRange();
    range.selectNodeContents(code);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    navigator.clipboard.writeText(selection);
    ele.classList.add('copied')
    ele.innerHTML = `
    <svg width="24" height="24">
        <use href="./assets/icons.svg#checkmark"></use>
    </svg>
    `
    setTimeout(() => {
        ele.classList.remove('copied')
        ele.innerHTML = `
        <svg width="18" height="18">
            <use href="./assets/icons.svg#copy"></use>
        </svg>
        `
        selection.removeRange(range);
    }, 250);
}

// Side Panel Links Handlling
function sidePanelLinksHandlling(link) {
    const links = document.querySelectorAll('.sidePanel .item')
    for (const link of links) {
        link.classList.remove('active')
    }
    link.classList.add('active')
    document.querySelector('.sidePanel').classList.remove('active')
}

// ========== Icons Factionality ==========
// Get & Print Icons in Icons Section
// Rammaz Icons
fetch('assets/icons.svg').then(response => response.text()).then(data => {
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(data, 'image/svg+xml');

    // Get the icons
    const icons = svgDoc.querySelectorAll('symbol');

    // print icons
    const container = document.querySelector('#Icons .rammaz')
    icons.forEach(icon => {
        container.innerHTML += `
        <div class="iconContainer">
            <div class="icon" id="${icon.id}" onclick="copyIcon(this)">
                <svg width="24" height="24">
                    <use href="./assets/icons.svg#${icon.id}"></use>
                </svg>
            </div>
            <p class="p-xxs">${icon.id}</p>
        </div>
        `
    });
});

// Tafanee Icons
fetch('assets/tafanee-icons.svg').then(response => response.text()).then(data => {
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(data, 'image/svg+xml');

    // Get the icons
    const icons = svgDoc.querySelectorAll('symbol');

    // print icons
    const container = document.querySelector('#Icons .tafanee')
    icons.forEach(icon => {
        container.innerHTML += `
        <div class="iconContainer">
            <div class="icon" id="${icon.id}" onclick="copyIcon(this)">
                <svg width="24" height="24">
                    <use href="./assets/tafanee-icons.svg#${icon.id}"></use>
                </svg>
            </div>
            <p class="p-xxs">${icon.id}</p>
        </div>
        `
    });
});

// Search about icon in design system
if (document.querySelector('.section#Icons .searchHeader input')) {
    document.querySelector('.section#Icons .searchHeader input').addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            document.querySelector('.section#Icons .searchHeader .Icon-BTN').click()
        }
    })
}
function iconsSearch(searchInput) {
    const searchValue = searchInput.value
    const icons = document.querySelectorAll('.section#Icons .iconsContainer .icon')
    const searchResult = document.querySelector('.section#Icons .searchHeader .searchResult')
    let matches = []

    icons.forEach(icon => {
        icon.parentNode.classList.remove('hidden')
        if (icon.id.includes(searchValue)) {
            matches.push(icon)
        } else {
            icon.parentNode.classList.add('hidden')
        }
    })

    if (matches.length == 0) {
        icons.forEach(icon => {
            icon.parentNode.classList.remove('hidden')
        })
        searchInput.value = ''
        searchInput.classList.remove('has-text')
        if (!searchValue == '') {
            searchResult.innerHTML = 'Error: Icon Not Found, Or Icon Not Added!'
        }
    } else {
        matches.forEach(icon => {
            icon.parentNode.classList.remove('hidden')
        })
        searchResult.innerHTML = ''
    }
}

// Copy Icon
function copyIcon(icon) {
    const iconHref = icon.querySelector('use').href['baseVal']
    const iconCode = `<svg width="24" height="24">
    <use xlink:href="${iconHref}"></use>
</svg>`
    navigator.clipboard.writeText(iconCode);

    icon.classList.add('copied')
    setTimeout(() => {
        icon.classList.remove('copied')
        const searchInput = document.querySelector('.section#Icons .searchHeader input')
        const icons = document.querySelectorAll('.section#Icons .iconsContainer .icon')
        const searchResult = document.querySelector('.section#Icons .searchHeader .searchResult')
        icons.forEach(icon => {
            icon.parentNode.classList.remove('hidden')
        })
        searchInput.value = ''
        searchInput.classList.remove('has-text')
        searchResult.innerHTML = ''
    }, 750);

}