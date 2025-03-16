const BetterPronounsJS = {};
const PronounIdMap = Object.freeze({
    "aeaer": "Ae",
    "any": "Any",
    "eem": "E",
    "faefaer": "Fae",
    "hehim": "He",
    "itits": "It",
    "other": "Other",
    "perper": "Per",
    "sheher": "She",
    "theythem": "They",
    "vever": "Ve",
    "xexem": "Xe",
    "ziehir": "Zie",
});
BetterPronounsJS.PronounIdMap = PronounIdMap

async function GetPronouns(user, sbClient) {
    
    const alejoPronouns = await _getPronounsJson(user);
    if(alejoPronouns === undefined || alejoPronouns === "") { return ""; }
    if(alejoPronouns.alt_pronoun_id === null){
        const sbPronouns = await sbClient.getUserPronouns('twitch', user);
        return sbPronouns.pronoun.pronouns;
    } else {
        return `(${PronounIdMap[alejoPronouns.pronoun_id]}/${PronounIdMap[alejoPronouns.alt_pronoun_id]})`;
    }
}
BetterPronounsJS.GetPronouns = GetPronouns;

async function GetPronounsPadStart(user) {
    const pronoun = await GetPronouns(user);
    if(pronoun === "") { return ""; }
    return ` ${pronoun}`;
}

BetterPronounsJS.GetPronounsPadStart = GetPronounsPadStart;

async function GetPronounsPadEnd(user,) {
    const pronoun = await GetPronouns(user);
    if(pronoun === "") { return ""; }
    return `${pronoun} `;
}

BetterPronounsJS.GetPronounsPadEnd = GetPronounsPadEnd;

async function _getPronounsJson(userId) {
    const json = await fetch(`https://api.pronouns.alejo.io/v1/users/${userId}`, {cache: "default"})
        .then(res => 
        {
            if(res.ok){
                return res.json();
            }
            else { return "";}
        })
        .then(json => json)
        .catch(_ => "");

    if(json != null) {
        return json;
    }
    else return undefined;
}