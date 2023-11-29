const { SlashCommandBuilder } = require('discord.js');
const { callLLM } = require('../../utils/LLM.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('tomio')
		.setDescription('Hlavne po me nic nechtej!')
		.addStringOption(option =>
			option.setName('dotaz')
				.setDescription('Neco co po nem chces')
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