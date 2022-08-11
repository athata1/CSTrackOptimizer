//Class and data structures for algorithm
class Database {
  static courseToInt = {};
  static intToCourse = {};
  static currIndex = 0;

  constructor() {

  }
  static getInt(course) {
    if (this.courseToInt.hasOwnProperty(course)) {
      return this.courseToInt[course];
    }
    return null;
  }

  static getCourse(val) {
      if (this.intToCourse.hasOwnProperty(val)) {
        return this.intToCourse[val];
      }
      return null;
  }

  static addCourse(course) {
    if (this.courseToInt.hasOwnProperty(course)) {
      return;
    }
    this.courseToInt[course] = this.currIndex;
    this.intToCourse[this.currIndex] = course;
    this.currIndex++;
  }
}

class Track {
  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }
}

class Algorithm extends Track {

  constructor() {
    super("Algorithms");
    this.required = ["CS381"];
    this.elective = [...new Set(["CS352", "CS354", "CS373", "CS471", "CS314", "CS334", "CS353", "CS355", "CS448", "CS456", "CS483", "MA341", "MA353", "MA362", "MA366", "MA385", "MA421", "MA453"])];
    
    let len = this.required.length;
    for (let i = 0; i < len; i++) {
      let course = this.required[0];
      Database.addCourse(course);
      this.required.push(Database.getInt(course));
      this.required.splice(0, 1);
    }
    len = this.elective.length;
    for (let i = 0; i < len; i++) {
      let course = this.elective[0];
      Database.addCourse(course);
      this.elective.push(Database.getInt(course));
      this.elective.splice(0, 1);
    }
  }
  getName() {
    return super.getName();
  }
  getUnfinishedRequirements(courses) {
    let output = [];
    if (!courses.includes(Database.getInt("CS352")) && !courses.includes(Database.getInt("CS354"))) {
      output.push(["CS352", "CS354"])
    }
    if (!courses.includes(Database.getInt("CS373")) && !courses.includes(Database.getInt("CS471"))) {
      output.push(["CS373", "CS471"])
    }

    return output;
  }

  isCompleted(courses) {
    for (const course of this.required) {
      if (!courses.includes(course)) {
        return false;
      }
    }

    if(!courses.includes(Database.getInt("CS352")) && !courses.includes(Database.getInt("CS354"))) {
      return false;
    }
    if (!courses.includes(Database.getInt("CS373")) && !courses.includes(Database.getInt("CS471"))) {
      return false;
    }
    
    let matches = 0;
    if (courses.includes(Database.getInt("MA341")) || courses.includes(Database.getInt("MA353")) || courses.includes(Database.getInt("MA362"))
            || courses.includes(Database.getInt("MA366")) || courses.includes(Database.getInt("MA385")) || courses.includes(Database.getInt("MA421"))
            || courses.includes(Database.getInt("MA453"))) {
            matches++;
    }

    for (const s of this.elective) {
      if (s == Database.getInt("MA341") || s == Database.getInt("MA353") || s == Database.getInt("MA362")
                    || s == Database.getInt("MA366") || s == Database.getInt("MA385") || s == Database.getInt("MA421")
                    || s == Database.getInt("MA453"))
        continue;

      if (s == Database.getInt("CS352") || s == Database.getInt("CS354")) {
        continue;
      }

      if (s == Database.getInt("CS373") || s == Database.getInt("CS471")) {
        continue;
      }
      
      if (courses.includes(s)) {
        matches++;
        if (matches >= 3) {
          return true;
        }
      }
    }

    return matches >= 3;
  }
}

class ComputationalScience extends Track {
  constructor() {
    super("Computational Science");
    this.required = ["CS314", "CS381"];
    this.elective = [... new Set(["MA266", "MA366", "CS373", "CS473", "CS478", "IE336", "ECE301", "CS352", "CS353", "CS354", "CS307", "CS422", "CS456", "CS471", "CS483", "CS514", "CS515", "CS520", "CS525", "IE335", "MA341", "MA440"])];

    let len = this.required.length;
    for (let i = 0; i < len; i++) {
      let course = this.required[0];
      Database.addCourse(course);
      this.required.push(Database.getInt(course));
      this.required.splice(0, 1);
    }
    len = this.elective.length;
    for (let i = 0; i < len; i++) {
      let course = this.elective[0];
      Database.addCourse(course);
      this.elective.push(Database.getInt(course));
      this.elective.splice(0, 1);
    }

  }

  getName() {
    return super.getName();
  }

  getUnfinishedRequirements(courses) {
    let output = [];
    if (!courses.includes(Database.getInt("MA266")) && !courses.includes(Database.getInt("MA366")))
        output.push(["MA266", "MA366"]);

    if (!courses.includes(Database.getInt("CS373")) && !courses.includes(Database.getInt("CS473"))
            && !courses.includes(Database.getInt("CS478")) &&
            !courses.includes(Database.getInt("IE336")) && !courses.includes(Database.getInt("ECE301")))
        output.push(["CS373","CS473","CS478", "IE336", "ECE301"]);

    if (!courses.includes(Database.getInt("CS352")) && !courses.includes(Database.getInt("CS353")) && !courses.includes(Database.getInt("CS354")))
        output.push(["CS352", "CS353", "CS354"]);

    return output;
  }

  isCompleted(courses) {
    for (const course of this.required) {
      if (!courses.includes(course))
          return false;
    }

    if (!courses.includes(Database.getInt("MA266")) && !courses.includes(Database.getInt("MA366")))
        return false;

    if (!courses.includes(Database.getInt("CS373")) && !courses.includes(Database.getInt("CS473"))
            && !courses.includes(Database.getInt("CS478")) &&
            !courses.includes(Database.getInt("IE336")) && !courses.includes(Database.getInt("ECE301")))
        return false;

    if (!courses.includes(Database.getInt("CS352")) && !courses.includes(Database.getInt("CS353")) && !courses.includes(Database.getInt("CS354")))
        return false;

    let matches = 0;
    for (const s of this.elective) {
        if (s == Database.getInt("MA366") || s == Database.getInt("MA266"))
            continue;
        if (s == (Database.getInt("CS373")) || s == (Database.getInt("CS473"))
                || s == (Database.getInt("CS478")) ||
                s == (Database.getInt("IE336")) || s ==Database.getInt("ECE301"))
            continue;

        if (s == (Database.getInt("CS352")) || s == (Database.getInt("CS353")) || s == (Database.getInt("CS354")))
            continue;

        if (courses.includes(s)) {
            matches++;
            if (matches >= 2)
                return true;
        }
    }
    return false;
  }
}

class ComputerGraphics extends Track {
  constructor() {
    super("Computer Graphics");
    this.required = ["CS314", "CS334"];
    this.elective = [...new Set(["CS373", "CS434", "CS471", "CS352", "CS354", "CS381", "CS422", "CS456", "CS490-IDV"])];
    let len = this.required.length;
    for (let i = 0; i < len; i++) {
      let course = this.required[0];
      Database.addCourse(course);
      this.required.push(Database.getInt(course));
      this.required.splice(0, 1);
    }
    len = this.elective.length;
    for (let i = 0; i < len; i++) {
      let course = this.elective[0];
      Database.addCourse(course);
      this.elective.push(Database.getInt(course));
      this.elective.splice(0, 1);
    }
  }

  getName() {
    return super.getName();
  }

  getUnfinishedRequirements(courses) {
    let output = [];
    if (!courses.includes(Database.getInt("CS373")) && !courses.includes(Database.getInt("CS434"))
    && !courses.includes(Database.getInt("CS471")))
      output.push(["CS373","CS434", "CS471"]);

      return output;
  }

  isCompleted(courses) {
    for (const course of this.required) {
        if (!courses.includes(course)) {
            return false;
        }
    }

    let matches = 0;
    if (!courses.includes(Database.getInt("CS373")) && !courses.includes(Database.getInt("CS434"))
        && !courses.includes(Database.getInt("CS471")))
        return false;

    let count = -1;
    if (courses.includes(Database.getInt("CS373")))
        count++;
    if (courses.includes(Database.getInt("CS434")))
        count++;
    if (courses.includes(Database.getInt("CS471")))
        count++;
    matches += count;
    for (const s of this.elective) {
        if (s == Database.getInt("CS373") || s == Database.getInt("CS434") || s == Database.getInt("CS471"))
            continue;
        if (courses.includes(s)) {
            matches++;
            if (matches >= 3) {
                return true;
            }
        }
    }
    return matches >= 3;
    }
}

class Databases extends Track {
  constructor() {
    super("Databases");
    this.required = ["CS348", "CS381", "CS448"];
    this.elective = [...new Set(["CS373", "CS473", "CS352", "CS353", "CS354", "CS355", "CS426", "CS373", "CS422", "CS471", "CS473", "CS478", "CS483", "CS490", "CS497", "EPIC411", "EPIC412"])];
    let len = this.required.length;
    for (let i = 0; i < len; i++) {
      let course = this.required[0];
      Database.addCourse(course);
      this.required.push(Database.getInt(course));
      this.required.splice(0, 1);
    }
    len = this.elective.length;
    for (let i = 0; i < len; i++) {
      let course = this.elective[0];
      Database.addCourse(course);
      this.elective.push(Database.getInt(course));
      this.elective.splice(0, 1);
    }
  }

  getName() {
    return super.getName();
  }

  getUnfinishedRequirements(courses) {
    let output = [];

    if (!courses.includes(Database.getInt("CS373")) && !courses.includes(Database.getInt("CS473"))) {
        output.push(["CS373", "CS473"]);
    }

    return output;
  }

  isCompleted(courses) {
    for (const course of this.required) {
      if (!courses.includes(course))
          return false;
    }


    //Requirements
    if (!courses.includes(Database.getInt("CS373")) && !courses.includes(Database.getInt("CS473"))) {
        return false;
    }

    //Category 1
    if (!courses.includes(Database.getInt("CS352")) && !courses.includes(Database.getInt("CS353")) && !courses.includes(Database.getInt("CS354")))
        return false;

    //Category 2
    if (!courses.includes(Database.getInt("CS355")) && !courses.includes(Database.getInt("CS426")))
        return false;

    //Category 3
    if (courses.includes(Database.getInt("CS373")) && courses.includes(Database.getInt("CS473"))) {
        return true;
    }

    if (courses.includes(Database.getInt("CS490")) || courses.includes(Database.getInt("CS497")) || courses.includes(Database.getInt("EPICS411"))
        || courses.includes(Database.getInt("EPICS412")))
        return true;

    if (!courses.includes(Database.getInt("CS422")) && !courses.includes(Database.getInt("CS471"))
            && !courses.includes(Database.getInt("CS478")) && !courses.includes(Database.getInt("CS483")))
        return false;

    return true;
  }
}

class MachineIntelligence extends Track {
  constructor() {
    super("Machine Intelligence");
    this.required = ["CS373", "CS381", "STAT416 or MA416 or STAT512", ];
    this.elective = [...new Set(["CS473", "CS314", "CS348", "CS352", "CS448", "CS456", "CS471", "CS483", "CS490-HCI", "CS490-LDA", "CS490-IDV", "CS577", "CS578", ])];
    let len = this.required.length;
    for (let i = 0; i < len; i++) {
      let course = this.required[0];
      Database.addCourse(course);
      this.required.push(Database.getInt(course));
      this.required.splice(0, 1);
    }
    len = this.elective.length;
    for (let i = 0; i < len; i++) {
      let course = this.elective[0];
      Database.addCourse(course);
      this.elective.push(Database.getInt(course));
      this.elective.splice(0, 1);
    }
  }

  getName() {
    return super.getName();
  }

  getUnfinishedRequirements(courses) {
    let output = [];
    if (!courses.includes(Database.getInt("CS471")) && !courses.includes(Database.getInt("CS473"))) {
      output.push(["CS471", "CS473"]);
    }

    return output;
  }

  isCompleted(courses) {
    for (const s of this.required) {
      if (!courses.includes(s)) {
          return false;
      }
    }

    let matches = 0;
    if (courses.includes(Database.getInt("CS471")) && courses.includes(Database.getInt("CS473"))) {
        matches++;
    }
    if (!courses.includes(Database.getInt("CS471")) && !courses.includes(Database.getInt("CS473"))) {
        return false;
    }

    for (const s of this.elective) {
        if (s == (Database.getInt("CS471")) || s == (Database.getInt("CS473")))
            continue;

        if (courses.includes(s))
            matches++;
        if (matches >= 2)
            return true;
    }

    return false;
  }
}

class ProgrammingLanguages extends Track {
  constructor() {
    super("Programming Languages");
    this.required = ["CS352", "CS354", "CS456", ];
    this.elective = [...new Set(["CS307", "CS408", "CS348", "CS448", "CS353", "CS381", "CS426", "CS483", "CS560", "MA385", "MA453", ])];
    let len = this.required.length;
    for (let i = 0; i < len; i++) {
      let course = this.required[0];
      Database.addCourse(course);
      this.required.push(Database.getInt(course));
      this.required.splice(0, 1);
    }
    len = this.elective.length;
    for (let i = 0; i < len; i++) {
      let course = this.elective[0];
      Database.addCourse(course);
      this.elective.push(Database.getInt(course));
      this.elective.splice(0, 1);
    }
  }

  get Name() {
    return super.getName();
  }

  getUnfinishedRequirements(courses) {
    return [];
  }

  isCompleted(courses) {
    for (const s of this.required) {
      if (!courses.includes(s))
          return false;
    }
    let matches = 0;

    if (courses.includes(Database.getInt("CS307")) || courses.includes(Database.getInt("CS408")))
        matches++;

    if (courses.includes(Database.getInt("CS348")) || courses.includes(Database.getInt("CS448")))
        matches++;

    if (courses.includes(Database.getInt("MA385")) || courses.includes(Database.getInt("MA453")))
        matches++;

    if (matches >= 3)
        return true;
    for (const s of this.elective) {
        if (s == (Database.getInt("CS307")) || s == (Database.getInt("CS408")))
            continue;

        if (s == (Database.getInt("CS348")) || s == (Database.getInt("CS448")))
            continue;

        if (s == (Database.getInt("MA385")) || s == (Database.getInt("MA453")))
            continue;

        if (courses.includes(s))
            matches++;
        if (matches >= 3)
            return true;
    }

    return false;
  }
}

class Security extends Track {
  constructor() {
    super("Security");
    this.required = ["CS354", "CS355", "CS426", ];
    this.elective = [...new Set(["CS307", "CS408", "CS348", "CS448", "CS473", "CS352", "CS353", "CS456", "CS373", "CS471", "CS381", "CS422", "CS489", "CS490-DSO", "CS490-SWS", ])];
    let len = this.required.length;
    for (let i = 0; i < len; i++) {
      let course = this.required[0];
      Database.addCourse(course);
      this.required.push(Database.getInt(course));
      this.required.splice(0, 1);
    }
    len = this.elective.length;
    for (let i = 0; i < len; i++) {
      let course = this.elective[0];
      Database.addCourse(course);
      this.elective.push(Database.getInt(course));
      this.elective.splice(0, 1);
    }
  }

  getName() {
    return super.getName();
  }

  getUnfinishedRequirements(courses) {
    return [];
  }

  isCompleted(courses) {
    for (const s of this.required) {
      if (!courses.includes(s))
          return false;
    }
    let matches = 0;

    if (courses.includes(Database.getInt("CS307")) || courses.includes(Database.getInt("CS408")))
        matches++;

    if (courses.includes(Database.getInt("CS348"))
            || courses.includes(Database.getInt("CS448")) ||
            courses.includes(Database.getInt("CS473")))
        matches++;
    if (courses.includes(Database.getInt("CS352")))
        matches++;

    if (courses.includes(Database.getInt("CS353")) || courses.includes(Database.getInt("CS456")))
        matches++;

    if (courses.includes(Database.getInt("CS373")) || courses.includes(Database.getInt("CS471")))
        matches++;

    if (courses.includes(Database.getInt("CS381")))
        matches++;

    if (courses.includes(Database.getInt("CS422")))
        matches++;

    if (courses.includes(Database.getInt("CS489")) || courses.includes(Database.getInt("CS490-DSO")))
        matches++;

    if (courses.includes(Database.getInt("CS490-SWS")))
        matches++;

    return matches >= 3;
  }
}

class Software extends Track {
  constructor() {
    super("Software");
    this.required = ["CS307", "CS381", "CS408", "CS407", ];
    this.elective = [...new Set(["CS348", "CS352", "CS353", "CS354", "CS373", "CS422", "CS426", "CS448", "CS456", "CS473", "CS489", "CS490-CLC", "CS490-DSO", "CS490-SWS", "CS510", "CS590-SRS", ])];
    let len = this.required.length;
    for (let i = 0; i < len; i++) {
      let course = this.required[0];
      Database.addCourse(course);
      this.required.push(Database.getInt(course));
      this.required.splice(0, 1);
    }
    len = this.elective.length;
    for (let i = 0; i < len; i++) {
      let course = this.elective[0];
      Database.addCourse(course);
      this.elective.push(Database.getInt(course));
      this.elective.splice(0, 1);
    }
  }

  getName() {
    return super.getName();
  }

  getUnfinishedRequirements(courses) {
    let output = [];
    if (!courses.includes(Database.getInt("CS354")) && !courses.includes(Database.getInt("CS352"))) {
      output.push(["CS352", "CS354"]);
    }

    return output;
  }

  isCompleted(courses) {
    for (const s of this.required) {
      if (!courses.includes(s)) {
          return false;
      }
    }

    if (courses.includes(Database.getInt(("CS354"))) && courses.includes(Database.getInt("CS352"))) {
        return true;
    }
    if (!courses.includes(Database.getInt("CS354")) && !courses.includes(Database.getInt("CS352"))) {
        return false;
    }

    for (const s of this.elective) {
        if (s == Database.getInt("CS354") || s == Database.getInt("CS352"))
            continue;
        if (courses.includes(s))
            return true;
    }

    return false;
  }
}

class Systems extends Track {
  constructor() {
    super("Systems");
    this.required = ["CS352", "CS354", "CS422"];
    this.elective =[...new Set(["CS307", "CS334", "CS353", "CS381", "CS426", "CS448", "CS456", "CS489", "CS490-DSO", "CS490"])];
    let len = this.required.length;
    for (let i = 0; i < len; i++) {
      let course = this.required[0];
      Database.addCourse(course);
      this.required.push(Database.getInt(course));
      this.required.splice(0, 1);
    }
    len = this.elective.length;
    for (let i = 0; i < len; i++) {
      let course = this.elective[0];
      Database.addCourse(course);
      this.elective.push(Database.getInt(course));
      this.elective.splice(0, 1);
    }
  }

  getName() {
    return super.getName();
  }

  getUnfinishedRequirements(courses) {
    return [];
  }

  isCompleted(courses) {
    for (const s of this.required) {
      if (!courses.includes(s)) {
          return false;
      }
    }
    let matches = 0;
    for (const s of this.elective) {
        if (courses.includes(s))
            matches++;
        if (matches == 3)
            return true;
    }

    return false;
  }
}

class SmallestNumberOfClasses {
  constructor() {
    this.requiredCourses = [];
    this.totalElectives = [];
    this.trackList = [];
    this.removed = [];
    this.added = [];
    this.index = 0;
  }

  addTrack(index) {
    switch(index) {
      case 0:
        this.trackList.push(new Databases());
        break;
      case 1:
        this.trackList.push(new ComputationalScience());
        break;
      case 2:
        this.trackList.push(new ComputerGraphics());
        break;
      case 3:
        this.trackList.push(new Algorithm());
        break;
      case 4:
        this.trackList.push(new ProgrammingLanguages);
        break;
      case 5:
        this.trackList.push(new Software);
        break;
      case 6:
        this.trackList.push(new Systems);
        break;
      case 7:
        this.trackList.push(new Security);
        break;
      case 8:
        this.trackList.push(new MachineIntelligence);
        break;
      default:
        break;
      
    }
  }

  addRequiredAndElectives() {
    this.trackList.forEach(track => {
      track.required.forEach(course => {
        if (!this.requiredCourses.includes(course))
          this.requiredCourses.push(course);
      });
    });
    this.trackList.forEach(track => {
      track.elective.forEach(course => {
        if (!this.requiredCourses.includes(course) && !this.totalElectives.includes(course))
          this.totalElectives.push(course);
      });
    })
  }

  getAllCombinations(requirements, index, combinations, curr) {
    if (index == requirements.length) {
      let temp = curr.slice();
      for (let i = temp.length; i >= 0; i--) {
        if (temp.indexOf(temp[i]) != i) {
          temp.splice(i,1);
        }
      }
      combinations.push(temp);
      return;
    }

    for (const s of requirements[index]) {
      if (this.removed.includes(s)) {
        continue;
      }
      curr.push(s);
      this.getAllCombinations(requirements, index + 1, combinations, curr);
      curr.splice(index, 1);
    }
    return;
  }

  
  getNextUnfinishedRequirements() {
    for (let i = this.index; i < this.trackList.length; i++) {
      this.index = i + 1;
      let arr = this.trackList[i].getUnfinishedRequirements(this.requiredCourses);
      if (arr.length != 0)
        return arr;
    }
    return null;
  }

  getMinClasses() {
    this.addRequiredAndElectives();

    let requirements = [];
    while (true) {
      let list = this.getNextUnfinishedRequirements();
      if (list == null) {
        break;
      }
      for (const requirement of list) {
          requirements.push(requirement);
      }
    }
    
    let queue = [];
    if (requirements.length != 0) {
      let comb = [];
      this.getAllCombinations(requirements, 0, comb, []);
      if (comb.length == 0) {
        return null;
      }
      comb = [...new Set(comb.map((obj) =>JSON.stringify(obj)))].map((json) => JSON.parse(json)).sort((a,b)=>a.length - b.length);

      let min = comb[0].length;
      for (let i = 0; i < comb.length; i++) {
        if (comb[i].length != min) {
          break;
        }
        let req = this.requiredCourses.slice();
        let elec = this.totalElectives.slice();
        for (const course of comb[i]) {
          req.push(Database.getInt(course));
          elec.splice(elec.indexOf(Database.getInt(course)),1);
        }
        queue.push([req,elec]);
      }
    }

    if (queue.length == 0) {
      queue.push([this.requiredCourses.slice(), this.totalElectives.slice()]);
      console.log(queue[0]);
    }
   
    for (const recElec of queue) {
      if (this.allCoursesSatisfied(recElec[0]))
        return recElec[0];
    }

   while (queue.length != 0) {
      let size = queue.length;
      for (let i = 0; i < size; i++) {
        let recElec = queue.shift();
        let currCourses = recElec[0];
        let remaining = recElec[1];
        for (const course of remaining) {
            let newCurr = currCourses.slice();
            newCurr.push(course);
            if (this.allCoursesSatisfied(newCurr)) {
              return newCurr;
            }
            let newRemaining = remaining.slice();
            newRemaining.splice(newRemaining.indexOf(course),1);
            queue.push([newCurr,newRemaining]);
        }
      }
    }
    return null;
  }

  allCoursesSatisfied(courses) {
    for (const track of this.trackList) {
      if (!track.isCompleted(courses)) {
        return false;
      }
    }
    return true;
  }
}

let algorithm = new SmallestNumberOfClasses();

let containers = document.querySelectorAll(".container");
let currContainer = 0;


//All info needed for step 1
let tracks = document.querySelectorAll(".track");
let trackList = [];
let countTracks = 0;
let stepOneButton = document.querySelector("#step-1");


submitStepOne = () => {
  if (containers[currContainer].querySelector(".submit").classList.contains("not-selected"))
    return;

  for (index of trackList) {
    algorithm.addTrack(index);
  }
  
  containers[currContainer].classList.add("none");
  containers[++currContainer].classList.remove("none");
}
stepOneButton.addEventListener("click", submitStepOne);

for (let i = 0; i < tracks.length; i++) {
  tracks[i].addEventListener("click", (e) => {
    if (e.target.classList.contains("track-selected")) {
      e.target.classList.remove("track-selected");
      trackList.splice(trackList.indexOf(i), 1);
      countTracks--;
      if (countTracks == 0) {
          stepOneButton.classList.add("not-selected");
      }
  }
  else {
    e.target.classList.add("track-selected");
    countTracks++;
    trackList.push(i);
    if (countTracks == 1) {
        stepOneButton.classList.remove("not-selected");
    }
  }
  });
}
tracks = null;

//All Information Needed for Step 2
submitStepTwo= () => {
  if (containers[currContainer].querySelector(".submit").classList.contains("not-selected"))
    return;

  containers[currContainer].classList.add("none");
  containers[++currContainer].classList.remove("none");
  let res = algorithm.getMinClasses();
  console.log(res);
  res = res.map((num) => Database.getCourse(num)).sort();
  console.log(res);
  containers[currContainer].querySelector(".loader").classList.add("none");
  
  let elem = document.createElement("div");
  elem.style.fontSize = "1.75rem";
  elem.textContent = "Selected Tracks:";
  elem.style.textDecoration = "underline";
  containers[currContainer].querySelector("#select").appendChild(elem);

  for (const track of algorithm.trackList) {
    let elem = document.createElement("div");
    elem.style.fontSize = "1.5rem";
    elem.textContent = track.getName();
    containers[currContainer].querySelector("#select").appendChild(elem);
  }

  let resultContainer = containers[currContainer].querySelector("#result");
  for (const course of res) {
    let elem = document.createElement("div");
    elem.classList.add("result-data");
    elem.textContent = course;
    resultContainer.appendChild(elem);
  }
}
let stepTwoButton = document.querySelector("#step-2");
stepTwoButton.addEventListener("click", submitStepTwo);
stepTwoButton = null;