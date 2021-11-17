"use strict!";

const init = () => {
  document.querySelectorAll(".tooltip").forEach((el) =>
    el.addEventListener("click", (e) => {
      e.target.nextElementSibling.classList.remove("hidden");
      document.querySelector(".overlay").classList.remove("hidden");
    })
  );

  document.addEventListener("scroll", () => {
    const links = Array.from(document.querySelectorAll(".nav__link"));
    const sections = document.querySelectorAll(".topics");

    const setFocus = () => {
      const removeClass = (params) => {
        params.elements.forEach((el) => el.classList.add(params.class));
      };

      const addClass = (params) => {
        params.elements.forEach((el, i) => {
          const top = el.getBoundingClientRect().top;
          const bottom = el.getBoundingClientRect().bottom;

          if (top >= 40) {
            params.element[i].classList.remove(params.class);
          }
        });
      };

      removeClass({ elements: links, class: "highlight" });
      addClass({ elements: sections, class: "highlight", element: links });
    };

    setFocus();
  });

  document.querySelectorAll(".modal").forEach((modal) =>
    modal.addEventListener("click", (e) => {
      e.target.closest(".modal").classList.add("hidden");
      document.querySelector(".overlay").classList.add("hidden");
    })
  );

  document.querySelector(".overlay").addEventListener("click", (e) => {
    document.querySelector(".modal:not(.hidden)").classList.add("hidden");
    document.querySelector(".overlay").classList.add("hidden");
  });

  const goTo = () => {
    const navs = document.querySelectorAll(".nav__link");
    const sections = document.querySelectorAll(".topics");

    navs.forEach((el, i) =>
      el.addEventListener("click", () => {
        // alignToTop true, false
        // options {behavior: auto or smooth, block: start, center, end, nearest,nearest, inline: start, center, end}
        sections[i].scrollIntoView(true, {
          behavior: "smooth",
          block: "end",
        });

        const scrollDown = sections[i].getBoundingClientRect().top - 30;

        window.scrollBy(0, scrollDown);
      })
    );
  };

  goTo();

  const viewResult = () => {
    const topics = document.querySelectorAll(".topics");
    const arr = [];

    let count = 0;
    let obj = {};

    const getAnswer = (el) => {
      const answer = el.querySelector(".textarea");

      if (answer !== null) {
        return answer.value;
      } else {
        return "";
      }
    };

    const getScore = (el) => {
      const score = el.querySelector('input[class="radio__input"]:checked');

      if (score !== null) {
        return score.value;
      } else {
        return "";
      }
    };

    const getAnswers = (el) => {
      const obj = {
        info: [],
        answers: [],
        scores: [],
      };

      const answers = Array.from(
        el.querySelectorAll(".topic__questions-answers")
      );

      if (answers.length !== 0) {
        answers.forEach((answer, i) => {
          obj.answers.push(getAnswer(answer));
          obj.scores.push(getScore(answer));
        });
      }

      return obj;
    };

    topics.forEach((topic, i) => {
      if (i === 0) {
        topic.querySelectorAll("input").forEach((el) => {
          obj["info" + count] = el.value;
          count = count + 1;
        });
      }

      /*   //   if (i === 0) {
      //     let obj = { topic: "INFORMATION", answers: [] };
      //     obj.answers.push(
      //       Array.from(topic.querySelectorAll("input")).map((el) => el.value)
      //     );
      //     arr.push(obj);
      //   }

      //   if (i !== 0 && i !== topics.length - 1) {
      //     const { answers, scores } = getAnswers(topic);
      //     const obj = {
      //       topic: topic.querySelector(".topic__title").innerText,
      //       average: "",
      //       answers: answers,
      //       scores: scores,
      //     };
      //     arr.push(obj);
      //   } */
    });
    console.log(obj);
    return obj;
  };

  const submitData = () => {
    // Push data in Google Sheets from external app :
    const obj = viewResult();
    const request_url =
      "https://script.google.com/macros/s/AKfycbx6q4yu-BWuC5Z-Nj52lVzF-4KyMx6uprrZFQ6NlyZbGO0YTd-gue_4VBsTvFKl9-Ekwg/exec";

    fetch(request_url, {
      method: "POST",
      mode: "no-cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      body: JSON.stringify(obj),
    });
  };

  document.querySelector(".button").addEventListener("click", submitData);
};

document.addEventListener("DOMContentLoaded", init);

/* <div class="confirm">
      <div class="confirm__window">
        <div class="confirm__titlebar">
          <span class="confirm__title">INTERVIEW RESULT</span>
          <button class="confirm__close">&times</button>
        </div>
        <div class="confirm__content">
          <div class="confirm__topics">
            <div class="">Topics</div>
            <div class="">Average</div>
          </div>
        </div>
        <div class="confirm__content">
          <div class="confirm__topics">
            <div class="">Interview</div>
            <div class="">4</div>
          </div>
        </div>
        <div class="confirm__content">
          <div class="confirm__topics">
            <div class="">Interview</div>
            <div class="">4</div>
          </div>
        </div>
        <div class="confirm__content">
          <div class="confirm__topics">
            <div class="">Interview</div>
            <div class="">4</div>
          </div>
        </div>
        <div class="confirm__content">
          <div class="confirm__topics">
            <div class="">Interview</div>
            <div class="">4</div>
          </div>
        </div>
        <div class="confirm__content">
          <div class="confirm__topics">
            <div class="">Interview</div>
            <div class="">4</div>
          </div>
        </div>
        <div class="confirm__content">
          <div class="confirm__topics">
            <div class="">Interview</div>
            <div class="">4</div>
          </div>
        </div>
        <div class="confirm__content">
          <div class="confirm__topics">
            <div class="">Interview</div>
            <div class="">4</div>
          </div>
        </div>
        <div class="confirm__content">
          <div class="confirm__topics">
            <div class="">Interview</div>
            <div class="">4</div>
          </div>
        </div>
        <div class="confirm__content">
          <div class="confirm__topics">
            <div class="">Interview</div>
            <div class="">4</div>
          </div>
        </div>
        <div class="confirm__content">
          <div class="confirm__topics">
            <div class="">Interview</div>
            <div class="">4</div>
          </div>
        </div>
        <div class="confirm__content">
          <div class="confirm__topics">
            <div class="">Interview</div>
            <div class="">4</div>
          </div>
        </div>
        <div class="confirm__buttons">
          <button
            class="confirm__button confirm__button--ok confirm__button--fill"
          >
            ${options.okText}
          </button>
          <button class="confirm__button confirm__button--cancel">
            ${options.cancelText}
          </button>
        </div>
      </div
    </div> */
