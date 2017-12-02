//http://adventofcode.com/2017/day/1
// A 1393
// B 1292

const input = '5994521226795838486188872189952551475352929145357284983463678944777228139398117649129843853837124228353689551178129353548331779783742915361343229141538334688254819714813664439268791978215553677772838853328835345484711229767477729948473391228776486456686265114875686536926498634495695692252159373971631543594656954494117149294648876661157534851938933954787612146436571183144494679952452325989212481219139686138139314915852774628718443532415524776642877131763359413822986619312862889689472397776968662148753187767793762654133429349515324333877787925465541588584988827136676376128887819161672467142579261995482731878979284573246533688835226352691122169847832943513758924194232345988726741789247379184319782387757613138742817826316376233443521857881678228694863681971445442663251423184177628977899963919997529468354953548612966699526718649132789922584524556697715133163376463256225181833257692821331665532681288216949451276844419154245423434141834913951854551253339785533395949815115622811565999252555234944554473912359674379862182425695187593452363724591541992766651311175217218144998691121856882973825162368564156726989939993412963536831593196997676992942673571336164535927371229823236937293782396318237879715612956317715187757397815346635454412183198642637577528632393813964514681344162814122588795865169788121655353319233798811796765852443424783552419541481132132344487835757888468196543736833342945718867855493422435511348343711311624399744482832385998592864795271972577548584967433917322296752992127719964453376414665576196829945664941856493768794911984537445227285657716317974649417586528395488789946689914972732288276665356179889783557481819454699354317555417691494844812852232551189751386484638428296871436139489616192954267794441256929783839652519285835238736142997245189363849356454645663151314124885661919451447628964996797247781196891787171648169427894282768776275689124191811751135567692313571663637214298625367655969575699851121381872872875774999172839521617845847358966264291175387374464425566514426499166813392768677233356646752273398541814142523651415521363267414564886379863699323887278761615927993953372779567675';

console.log('Captcha A: ', getCaptchaA(input));
console.log('Captcha A(2): ', getCaptchaB(input, 1));
console.log('Captcha B: ', getCaptchaB(input));

//first try
function getCaptchaA(input) {
    let captchaSum = 0;
    const arr = input.split('');
    let prev = undefined;
    let matchcount = 0;
    let currentPosition = 0;
    for (const currentValue of arr) {
        currentPosition++;
        if (currentValue === prev) {
            matchcount++;
            if (matchcount > 0) {
                captchaSum += parseInt(currentValue, 10);
            }
        } else {
            matchcount = 0;
        }
        if (currentPosition === arr.length && currentValue === arr[0]) {
            captchaSum += parseInt(currentValue, 10);
        }
        prev = currentValue;
    }
    return captchaSum;
}

function getCaptchaB(input, step) {
    const arr = input.split('');
    const stepLength = step || arr.length / 2;

    let capSum = 0;
    for (let i = 0; i < arr.length; i++) {
        let newArr = [];
        let currentVal = arr[i]
        newArr.push(arr[i]);
        for (let j = 1; j < arr.length; j++) {
            newArr.push(arr[(i + j) % arr.length]);
        }
        if (newArr[0] === newArr[stepLength]) {
            capSum += parseInt(currentVal, 10);
        }
    }
    return capSum;
}