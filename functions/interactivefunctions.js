const fs = require('fs');
const path = require('path');
const https = require('https');
const { SlashCommandBuilder, MessageFlags, ModalBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

// Generates a consent button which the user will have to agree to. 
const consentMessage = (interaction, user) => {
    let outtext = `# Consent to being Bound
<@${process.env.CLIENTID}> is a bot which facilitates restraints in this channel, which have certain effects on you as you wear them, primarily centered around some form of speech impairment. Effects will only apply within this channel. 
Restraints and toys used include the following:
- Gags and Vibrators: Impair and modify speech in various ways
- Mittens and Chastity: Restrict modifying these settings
- Heavy Bondage: Restrict modifying any setting
- Collars: Allow others to perform more significant actions on you.
You can access these commands by typing / to bring up a list of what can be done.
*Where possible, the bot's design philosophy is **"Consent First,"** meaning that you will have to make an active choice to give up control. Examples of this include mittens, chastity and heavy bondage. Collars can override this, if you wear them. Please use these at your own risk and leverage the **keyholder** and **other controls** presented as necessary.*
<@${user}>, by clicking the button below, you acknowledge the above risks and considerations and users will be able to play with you using the bot.`
    const confirm = new ButtonBuilder().setCustomId('confirm').setLabel('I Accept').setStyle(ButtonStyle.Success);
    const row = new ActionRowBuilder().addComponents(confirm);

    return {
        content: outtext,
        components: [row],
        withResponse: true
    }
}

const assignConsent = (user) => {
    if (process.consented == undefined) { process.consented = {} }
    process.consented[user] = {
        mainconsent: true
    }
    fs.writeFileSync(`${process.GagbotSavedFileDirectory}/consentusers.txt`, JSON.stringify(process.consented));
}

const getConsent = (user) => {
    if (process.consented == undefined) { process.consented = {} }
    return process.consented[user]
}

// check with getConsent, then pipe to await handleConsent and return. 
const handleConsent = async (interaction, user) => {
    let testusertarget = user;
    let consentform = consentMessage(interaction, testusertarget);
    const collectorFilter = (i) => i.user.id === testusertarget;
    const response = await interaction.reply(consentform)
    console.log(response)
    try {
        const confirmation = await response.resource.message.awaitMessageComponent({ filter: collectorFilter, time: 180_000 });
        console.log(confirmation);
        await interaction.editReply({ content: `Consent form agreed to by <@${testusertarget}>! Please re-run the command to tie!`, components: [] });
        assignConsent(user)
    } catch (err) {
        console.log(err);
        await interaction.editReply({ content: `Consent form was not agreed to for <@${testusertarget}>!`, components: [] });
    }
}

exports.consentMessage = consentMessage
exports.getConsent = getConsent
exports.handleConsent = handleConsent