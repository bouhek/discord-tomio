const { SlashCommandBuilder } = require('discord.js');
const { callLLM } = require('../../utils/LLM.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('tomio')
		.setDescription('Hlavně po mně nic nechtěj!')
		.addStringOption(option =>
			option.setName('dotaz')
				.setDescription('Něco co po něm chceš.')
				.setRequired(true)),
	async execute(interaction) {
		try {
			await interaction.deferReply();
			const reply = await callLLM(interaction.options.getString('dotaz'))
			await interaction.editReply(reply)
		} catch (error) {
			console.error(error);
			await interaction.reply('There was an error while executing this command!');
		}
	}
}