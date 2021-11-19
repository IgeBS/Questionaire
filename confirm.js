const Confirm = {
  open(options) {
    options = Object.assign(
      {},
      {
        title: "",
        okText: "OK",
        cancelText: "Cancel",
        data: [],
        onok: function () {},
        oncancel: function () {},
      },
      options
    );

    // ADD MAIN CONTAINER
    const template = document.createElement("div");
    template.className = "confirm";

    template.innerHTML = `
       <div class="confirm__window">
         <div class="confirm__titlebar">
           <span class="confirm__title">${options.title}</span>
           <button class="confirm__close">&times</button>
         </div>
         <div class="confirm__contents">
           <div class="confirm__content">
             <div class="">
               <div class="confirm__topic__title">INFORMATION</div>
             </div>
             <div class="">
               <div class="">DATE:</div>
               <div class="data">
                 ${options.data[0].answers[0][0]}
               </div>
             </div>
             <div class="">
               <div class="">NAME:</div>
               <div class="data">
                 ${options.data[0].answers[0][1]}
               </div>
             </div>
             <div class="">
               <div class="">EMAIL:</div>
               <div class="data">
                 ${options.data[0].answers[0][2]}
               </div>
             </div>
             <div class="">
               <div class="">INTERVIEWER:</div>
               <div class="data">
                 ${options.data[0].answers[0][3]}
               </div>
             </div>
           </div>
         </div>
         <div class="confirm__buttons">
           <button
             class="confirm__button confirm__button--ok confirm__button--fill"
           >
             OK
           </button>
           <button class="confirm__button confirm__button--cancel">
             CANCEL
           </button>
         </div>
       </div>
     `;

    // ADD CONTENT PER TOPIC
    for (let i = 1; i < options.data.length; i++) {
      // REFERENCE WHERE TO INSERT THE NEW CONTENT
      const insertBefore = template.querySelector(".confirm__contents");
      const content = document.createElement("div");
      content.className = "confirm__content";

      // ADD ANSWERS AND SCORE PER TOPIC
      let arr = [];
      for (let j = 0; j < options.data[i].answers.length; j++) {
        const answer =
          options.data[i].answers[j] === "" ? "-" : options.data[i].answers[j];
        const str = `
         <div>
           <div class="${
             i === options.data.length - 1 ? "" : "data"
           }">${answer}</div>
           <div class="data">${options.data[i].scores[j]}</div>
         </div>
         `;
        arr.push(str);
      }

      content.innerHTML = `
         <div>
           <div >${options.data[i].topic}</div>
           <div class="data">${options.data[i].average}</div>
         </div>
         ${arr.join("")}
       `;

      insertBefore.insertAdjacentElement("beforeend", content);
    }

    document.body.insertAdjacentElement("afterbegin", template);

    const confirmEl = document.querySelector(".confirm");
    const btnClose = confirmEl.querySelector(".confirm__close");
    const btnOk = confirmEl.querySelector(".confirm__button--ok");
    const btnCancel = confirmEl.querySelector(".confirm__button--cancel");

    async function saveAndClose() {
      await options.onok();
      confirmEl.classList.add("confirm--close");
      confirmEl.addEventListener("animationend", () => {
        document.body.removeChild(confirmEl);
      });
    }

    confirmEl.addEventListener("click", (e) => {
      if (e.target === confirmEl) {
        options.oncancel();
        this._close(confirmEl);
      }
    });

    btnOk.addEventListener("click", (e) => {
      saveAndClose();
    });

    [btnClose, btnCancel].forEach((el) => {
      el.addEventListener("click", () => {
        options.oncancel();
        this._close(confirmEl);
      });
    });
  },

  _close(confirmEl) {
    confirmEl.classList.add("confirm--close");
    confirmEl.addEventListener("animationend", () => {
      document.body.removeChild(confirmEl);
    });
  },
};
