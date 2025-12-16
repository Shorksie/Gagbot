const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const { getMitten, deleteMitten } = require('./../functions/gagfunctions.js')
const { getHeavy } = require('./../functions/heavyfunctions.js')
const { getPronouns } = require('./../functions/pronounfunctions.js')
const { consentMessage } = require('./../functions/interactivefunctions.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription(`Testing the consent form`),
    async execute(interaction) {
		let testusertarget = interaction.user;
        let consentform = consentMessage(interaction, testusertarget.id);
        const collectorFilter = (i) => i.user.id === interaction.user.id;
        const response = await interaction.reply(consentform)
        console.log(response)
        try {
            const confirmation = await response.resource.message.awaitMessageComponent({ filter: collectorFilter, time: 180_000 });
            await interaction.editReply({ content: `Consent form agreed to by ${testusertarget}! Please re-run the command to tie!`, components: [] });
        } catch {
            await interaction.editReply({ content: `Consent form was not agreed to for ${testusertarget}!`, components: [] });
        }
    }
}