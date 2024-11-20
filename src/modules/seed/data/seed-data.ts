import { BattlesuitResponse } from '../interfaces';

interface Honkai {
	battlesuit: BattlesuitResponse[];
}

export const initialData: Honkai = {
	battlesuit: [
		{
			id: 'vq',
			version: '6.5',
			name: 'Valkyrie Quicksand',
			type: 'quantum',
			valkyrie: 'Susannah',
			features: ['physical', 'bleed'],
			weapon: 'chakram',
			initialStar: 'A',
			leader: {
				core: {
					name: 'Inextinguishable Passion',
					description:
						'Leader Bonus:\nAll team members deal #1[i]% more Physical DMG. They also deal #2[i]% more Total DMG to bleeding enemies.'
				},
				subskills: [
					{
						name: 'Stand on My Own!',
						description: 'All team members deal #1[i]% more Physical DMG. They also deal #2[i]% more Total DMG to bleeding enemies.',
						maxLv: 3,
						params: {
							'1': [2.0, 2.1, 2.2],
							'2': [2.2, 2.3, 2.4]
						}
					}
				]
			},
			passive: {
				core: {
					name: 'Mystical Nights',
					description:
						"Passive bonuses apply automatically.\nAny DMG dealt by all of Valkyrie Quicksand's ATKs counts as Bleed DMG, which is neither ranged nor melee and cannot Crit.\nCasting weapon active makes her toss her chakram to form a drum surface, then button prompts appear:\nPerfect judgment: Deals 500% ATK of Physical DMG.\nGood judgment: Deals 450% ATK of Physical DMG.\nIf Ultimate and weapon active gets judgments and enemies are bleeding, deals another 500% ATK of Physical DMG.\nWeapon Skill CD: 12s."
				},
				subskills: [
					{
						name: 'Fully Focused',
						description:
							'Casting weapon active increases Total DMG by #1[i]% and Bleed DMG that enemies take by #2[i]% for 15s. Triggering it again refreshes its duration.',
						maxLv: 11,
						params: {
							'1': [2.0, 2.2, 2.4, 2.6, 2.8, 3.0, 3.2, 3.4, 3.6, 3.8, 4.0],
							'2': [1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0]
						}
					},
					{
						name: 'Improvised Dance',
						description:
							'After weapon active gets a Perfect judgment, recover #1[i] SP and deal #2[i]% more Physical DMG for 15s. Triggering it again resets the duration.',
						maxLv: 11,
						params: {
							'1': [0.3, 0.33, 0.36, 0.39, 0.42, 0.45, 0.48, 0.51, 0.54, 0.57, 0.6],
							'2': [2.5, 2.8, 3.1, 3.4, 3.7, 4.0, 4.3, 4.6, 4.9, 5.2, 5.5]
						}
					},
					{
						name: 'Extra Gift',
						description: 'Deals 2 DMG to Fixed DMG-only shields when self-inflicting Bleed.',
						requiredRank: 'ss'
					}
				]
			},
			evasion: {
				core: {
					name: 'C-Close Call!',
					description:
						'Evade enemy attacks up to twice in a row.\nUltimate Evasion Skill: Deal 300% ATK of Physical DMG to surrounding enemies and restores 200 Confidence. CD: 15s.\nUltimate Evasion restores 150 Confidence and can be connected into Basic ATK SEQ 3.'
				},
				subskills: [
					{
						name: 'Proceed with Caution',
						description: 'Triggering Ultimate Evasion Skill restores #1[i] HP.',
						maxLv: 10,
						params: {
							'1': [15.0, 16.6, 18.3, 20.0, 21.6, 23.3, 25.0, 26.6, 28.3, 30.0]
						}
					},
					{
						name: 'Agile Steps',
						description: 'Cast weapon active to trigger Ultimate Evasion Skill.'
					}
				]
			},
			special: {
				core: {
					name: 'Combo ATK: Want Some Gems?',
					description:
						'Tosses gems to deal Bleed DMG.\nValkyrie Quicksand gains Confidence through attacking. At the maximum amount of 600 Confidence, hold [ATK] to consume all Confidence and use Combo ATK:\nToss and kick gems to deal 240% x 2 + 40% x 5 ATK of Physical DMG and inflict 8 Bleed Trauma on hit. When performing Combo ATKs, gain 50% Total DMG Reduction.'
				},
				subskills: [
					{
						name: 'Gem Power',
						description: 'Combo ATK deals #1[i]% more Total DMG to bleeding enemies.',
						requiredRank: 'sss',
						maxLv: 11,
						params: {
							'1': [3.0, 3.3, 3.6, 3.9, 4.2, 4.5, 4.8, 5.1, 5.4, 5.7, 6.0]
						}
					},
					{
						name: 'Whew!',
						description: 'Combo ATK restores #1[i] SP on hit.',
						maxLv: 10,
						params: {
							'1': [0.7, 0.78, 0.87, 0.96, 1.05, 1.14, 1.23, 1.32, 1.41, 1.5]
						}
					}
				]
			},
			ultimate: {
				core: {
					name: 'One Thousand and One Fantasies',
					description:
						'A dazzling tambourine dance.\nAfter casting Ultimate, Valkyrie Quicksand will enter Dancing state and begin dancing, dealing 500% ATK of Physical DMG to all enemies and inflicting Collapse on QUA enemies once.\nThen button prompts will appear 5 times to the beat:\nPerfect judgment: Deals 500% ATK of Physical DMG to nearby enemies.\nGood judgment: Deals 450% ATK of Physical DMG to nearby enemies.\nSP: 125. CD: 20s.'
				},
				subskills: [
					{
						name: 'Rhythm Exercise',
						description: "Diversify Ultimate's button prompts (does not affect the touch screen)."
					},
					{
						name: 'Sandstorm',
						description: 'Ultimate deals #1[i]% more Physical DMG. If Ultimate gets a Perfect judgment, it deals #2[i]% more Total DMG.',
						requiredRank: 's',
						maxLv: 7,
						params: {
							'1': [1.5, 1.75, 2.0, 2.25, 2.5, 2.75, 3.0],
							'2': [2.5, 2.916, 3.33, 3.75, 4.16, 4.583, 5.0]
						}
					},
					{
						name: 'Oasis Spring',
						description: 'If Ultimate gets a Perfect judgment, recover another #1[i] SP and #2[i] HP.',
						maxLv: 3,
						params: {
							'1': [0.25, 0.375, 0.5],
							'2': [10.0, 15.0, 20.0]
						}
					}
				]
			},
			basic: {
				core: {
					name: 'Go Go Susannah!',
					description:
						'Dances and slashes with a chakram.\nSEQ 1: Deals 120% ATK of Physical DMG and restores 50 Confidence.\nSEQ 2: Deals 50% + 120% ATK of Physical DMG and restores 50 Confidence.\nSEQ 3: Deals 200% ATK of Physical DMG and restores 50 Confidence. SEQ 4: Deals 3 x 100% ATK of Physical DMG, restores 50 Confidence, and inflicts 4 Bleed Trauma.'
				},
				subskills: [
					{
						name: 'QTE: Susannah, Help Me Out!',
						description:
							'Triggered when an enemy is Time-Slowed or bleeding (refreshing included). Deals #1[i]% ATK of Physical DMG, restores 100 Confidence, and inflicts 4 Bleed Trauma. If Ultimate and weapon active gets judgments and enemies are bleeding, deals another #2[i]% ATK of Physical DMG.',
						maxLv: 7,
						params: {
							'1': [35.0, 40.83, 46.66, 52.5, 58.33, 64.16, 70.0],
							'2': [25.0, 29.16, 33.33, 37.5, 41.66, 45.83, 50.0]
						}
					},
					{
						name: 'Susannah is Capable!',
						description: 'When Basic ATK SEQ 4 hits, restores another #1[i] Confidence.',
						maxLv: 8,
						params: {
							'1': [5.0, 5.714, 6.428, 7.142, 7.856, 8.57, 9.284, 10.0]
						}
					},
					{
						name: "Susannah Won't Lose!",
						description:
							'Casting QTE, Combo ATK, or Ultimate grants High Morale state to the team, which lets them inflict 4 more Bleeding stacks. Each stack makes bleeding deal a extra 15% ATK of Physical DMG per 0.5s for 15s. Triggering it again refreshes the duration. Ultimate inflicts #1[i] Bleed Trauma on all enemies.',
						maxLv: 8,
						params: {
							'1': [0.3, 0.34285, 0.38571, 0.42857, 0.47142, 0.51428, 0.55714, 0.6]
						}
					}
				]
			},
			sp: {
				core: {
					name: "Da-Dum! Let's Dance!",
					description:
						'Dye Status\nEntry or casting Ultimate will Dye all enemies for 15s. The Bleed DMG caused by Bleed Trauma that Dyed enemies suffer come from the last inflictor of this state.'
				},
				subskills: [
					{
						name: 'Scorching Burn',
						description: 'After entry or casting Ultimate, deal #1[i]% more Bleed DMG for 15s. Triggering it again refreshes the duration.',
						requiredRank: 's',
						maxLv: 5,
						params: {
							'1': [0.6, 0.75, 0.9, 1.05, 1.2]
						}
					},
					{
						name: 'Tambourine Jingle',
						description: 'After casting Ultimate, inflict #1[i]% more Bleed Trauma for 15s. Triggering it again refreshes its duration.',
						requiredRank: 'ss',
						maxLv: 3,
						params: {
							'1': [1.0, 1.75, 2.5]
						}
					},
					{
						name: 'Romanticism',
						description: 'Bleeding inflicted by her deals #1[i]% more Total DMG.',
						requiredRank: 'sss',
						maxLv: 7,
						params: {
							'1': [1.0, 1.083, 1.16, 1.25, 1.33, 1.416, 1.5]
						}
					}
				]
			}
		},
		{
			id: 'hoh',
			version: '6.0',
			name: 'Herrscher of Human: Ego',
			type: 'psychic',
			valkyrie: 'Elysia',
			features: ['ice-dmg', 'freeze', 'time-mastery', 'burst', 'gather'],
			weapon: 'bow',
			initialStar: 'S',
			leader: {
				core: {
					name: 'Wandering Dream',
					description:
						"Leader Bonus:\nLeader Skill: Increases every Ice DMG battlesuit's initial SP by 60.0pt.\nIn Open World, this effect triggered once every 10 minutes.\nIncreases the team's Ice DMG by 35.0%, and while Stars of the Past is in effect, increases the team's Ice DMG by another 20.0%."
				},
				subskills: [
					{
						name: 'Wandering Dream',
						description:
							"Increases every Ice DMG battlesuit's initial SP by #1[f1].\nIn Open World, this effect triggered once every 10 minutes.\nIncreases the team's Ice DMG by #2[f1]%, and while Stars of the Past is in effect, increases the team's Ice DMG by another #3[f1]%.",
						maxLv: 2,
						params: {
							'1': [55, 60],
							'2': [32, 35],
							'3': [15, 20]
						}
					}
				]
			},
			passive: {
				core: {
					name: 'Enlightened Salvation',
					description:
						'Passive bonuses apply automatically.\nA balanced archer that has 2 shoot attempts.\nIf less than 2 shoot attempts remain, recover 1 attempt every 10s.\nBase Shooting Multiplier Correction: 100%\nAimed Base Shooting Multiplier Correction: 100%\n\nHerrscher of Human: Ego has two Herrscher Forms: Herrscher of Human Form and Herrscher of Origin Form. Cast Ultimate to switch between them.\nHer Charged ATK inflicts Pristine Seed stacks that last 15s and cap at 3. At 3 stacks, enemies enter Pristine Bloomage state for 2.5s. In Herrscher of Origin Form, Pristine Bloomage lasts for 3.5s and immobilizes enemies.\nHitting enemies in Pristine Bloomage state with weapon skill or special weapon skill triggers Ego Blossom. In Herrscher of Human Form, it deals 200% + 120% ATK of ICe DMG in an area. In Herrscher of Origin Form, it deals 500% ATK of Ice DMG. When Pristine Bloomage is removed, 1 Pristine Seed stack remains. Inflicting Pristine Seed again refreshes its duration.'
				},
				subskills: [
					{
						name: "Finale's Glory",
						description:
							"increases Ego Blossom's Total DMG by #1[f1]%.\nWHen Ego Blossom is triggered in Herrscher of Human form, it deals an extra #2[f1]% ATK of Ice DMG for each nearby enemy that is in Pristine Bloomage state. It registers 3 such enemies at most and cancels their Pristine Bloomage state.",
						maxLv: 11,
						params: {
							'1': [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
							'2': [30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50]
						}
					},
					{
						name: 'Unrestrained Abstinence',
						description:
							'After using Ultimate Evasion Skill in Herrscher of Human form, increases Ice DMG by #1[f1]% for 5s. CD: 60s.\nExiting Herrscher of Origin form refreshes the CD.',
						requiredRank: 'sss',
						maxLv: 11,
						params: {
							'1': [20, 23, 26, 29, 32, 35, 38, 41, 44, 47, 50]
						}
					},
					{
						name: 'Illusory Haze',
						description: 'Enemies carrying Pristine Seed receive #1[f1]% ATK of Ice DMG every second.',
						requiredRank: 's2',
						maxLv: 11,
						params: {
							'1': [20, 23, 26, 29, 32, 35, 38, 41, 44, 47, 50]
						}
					}
				]
			},
			evasion: {
				core: {
					name: 'Rising Starbeams',
					description:
						'Quickly dodge enemy attacks up to twice in a row\n\nUltimate Evasion Skill:\nIn Herrscher of Human form, causes Global Time Fracture for 3s. Within 10s, the next Charged ATK shoots an enhanced pristine arrow that deals 400% + 2 x 100% ATK of Ice DMG and inflicts 3 Pristine Seed stacks. CD: 18s.\nIn Herrscher of Origin form, creates a starry vortex to pull enemies for 5s. CD: 18s.'
				},
				subskills: [
					{
						name: 'Timeless Evocation',
						description:
							'When Herrscher of Human: Ego is off switch CD and a teammate consumes at least 100 SP in one go, her QTE is triggered. CD: 15s.',
						maxLv: 1
					},
					{
						name: 'Moonlit Romance',
						description: 'Non-Ultimate Evasion can also trigger Ultimate Evasion Skill.',
						maxLv: 1
					},
					{
						name: 'Thunderless Serenity',
						description:
							'Reduces Ultimate Evasion Skill CD by #1[f1]s.\nIn Herrscher of Human Form, Charged ATK speed increases by #2[f1]% and triggering Ultimate Evasion Skill grants 2 Crystal Ice Mirror stacks.',
						maxLv: 11,
						params: {
							'1': [2.0, 2.2, 2.4, 2.6, 2.8, 3, 3.2, 3.4, 3.6, 3.8, 4.0],
							'2': [25.0, 27.5, 30.0, 32.5, 35.0, 37.5, 40.0, 42.5, 45.0, 47.5, 50.0]
						}
					}
				]
			},
			special: {
				core: {
					name: 'Charged ATK: Infinite Helix',
					description:
						"Use a powerful attack that corresponds to the Herrscher Form.\nHerrscher of Human Form:\nHold [ATK] to create a crystal ballista. Once charging is complete, fire a pristine arrow that penerates every enemy along its trajectory, dealing 330% + 2 x 100% ATK of Ice DMG and inflicting 1 Pristine Seed stack. Hold [ATK] to fire consecutively, during which you can move.\nHerrscher of Origin Form:\nWhen Herrscher Charge is maxed, hold [ATK] to empty Herrscher Charge and summon Sprit of Origin to attack, dealing 700% ATK of Ice DMG. Hitting enemies resets Waltz of the Star's CD. This also creates a frost zone forward, adding 3 Pristine Seed stacks to all enemies in the zone. Frost zone lasts for 6s."
				},
				subskills: [
					{
						name: 'Affectionate Gale',
						description:
							"In Herrscher of Human form, increases Charged ATK's Total DMG by #1[f1]%.\nIn Herrscher of Origin form, increases Charged ATK's Total DMG by #2[f1]% and self's Total DMG by #3[f1]%.",
						requiredRank: 'ss',
						maxLv: 11,
						params: {
							'1': [12.0, 13.8, 15.6, 17.4, 19.2, 21.0, 22.8, 24.6, 26.4, 28.2, 30.0],
							'2': [20.0, 23.0, 26.0, 29.0, 32.0, 35.0, 38.0, 41.0, 44.0, 47.0, 50.0],
							'3': [5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0, 9.5, 10.0]
						}
					},
					{
						name: 'Gentle Warmth',
						description:
							'In Herrscher of Human form, increases Elemental Breach by #1[f1]%.\nIn Herrscher of Origin form, increases Elemental Breach by #2[f1]% and reduces Total DMG received by #3[f1]%.',
						maxLv: 11,
						params: {
							'1': [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10],
							'2': [12, 12.6, 13.2, 13.8, 14.4, 15, 15.6, 16.2, 16.8, 17.4, 18],
							'3': [25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25]
						}
					},
					{
						name: 'Budding Innocence',
						description:
							'On hitting an enemy carrying Pristine Seed, increases Total DMG by #1[f1]% and restores #2[f1] SP. SP recovery CD: 1s. When an enemy carrying Pristine Seed is defeated, restores #3[f1] HP, and grants 1 Crystal Ice Mirror stack in Herrscher of Human form.',
						maxLv: 11,
						params: {
							'1': [5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25],
							'2': [0.2, 0.28, 0.36, 0.44, 0.52, 0.6, 0.68, 0.76, 0.84, 0.92, 1.0],
							'3': [25.0, 27.5, 30.0, 32.5, 35.0, 37.5, 40.0, 42.5, 45.0, 47.5, 50.0]
						}
					}
				]
			},
			ultimate: {
				core: {
					name: 'Radiant Destiny',
					description:
						'Switch between 2 Herrscher forms.\nOn casting Ultimate, enter Herrscher of Origin form, create Stars of the Past, deal 500% ATK of Ice DMG, and inflict Pristine Bloomage and 6 Rime Trauma. During which, all skill timers and the stage timer is paused.\nIn Herrscher of Origin form, she is also in burst mode and gains Herrscher Charge (Max: 400; Initial: 0). She regains herrscher Charge over time, regaining 80 per second within the first 5s and 60 per second after 5s. During which she fights with a staff instead a bow.\nTap [Weapon] to cast Waltz of the Stars, which deals a total of 500% ATK of Ice DMG on the first cast, and 1400% ATK of Ice DMG afterward. Exiting Herrscher of Origin form clears this effect. Waltz of the Stars CD: 20s (unaffected by CD reduction).\nWhen on the field in Herrscher of Origin form for over 5s, tap [ULT] again or wait until 17s to cast Finisher, dealing 1100% ATK of Ice DMG. During which, all skill timers and the stage timer is paused. In the meantime, if she is switched out, she will still cast Finisher, only dealing 100% ATK of Ice DMG. Casting Finisher ends Herrrscher of Origin form, activates Herrscher of Human form, and cancels Stars of the past.\nSP: 125, CD: 10s.\n\nWhile Stars of the Past is in effect, gain the following buffs:\nRestore 0.5 SP to every Ice DMG dealer every second.\nInflict 0.5 Rimte Trauma on very enemy every second.\nIce DMG ELF deals 50% more Ice DMG.\nIce DMG battlesuit deal an extra 5% DMG (an HP loss effect).\nEnemy receives an extra 100 x ATK of DMG (HP looss effect) on being frozen. This effect immediately applies to frozen enemies once when Stars of the Past is created.\nShe cannot be defeated in Herrscher of Origin form.'
				},
				subskills: [
					{
						name: 'Original Pristinity',
						description:
							"Enemies carrying Pristine Seed or are in Pristine Bloomage state receive #1[f1]% more Total DMG from Herrscher of Human: Ego (cannot stack). She records teammates' SP consumption to gain 300 charges at most. In Herrscher of Origin Form, with over 0 charge, her Total DMG increases by #2[f1]%; With over 225 charges, her TOtal DMG increases by #3[f1]% for every charge over 225 charges. Exiting Herrscher of Origin form clears the charges.",
						maxLv: 6,
						params: {
							'1': [10, 12, 14, 16, 18, 20],
							'2': [5, 6, 7, 8, 9, 10],
							'3': [0.2, 0.24, 0.28, 0.32, 0.36, 0.4]
						}
					},
					{
						name: 'Truly Elysia',
						description:
							'Entering and exiting Herrscher of Origin Form cause Global Time Fracture for #1[f1]s and 1.0s respectively, and refresh Ultimate Evasion Skill CD once.',
						maxLv: 3,
						params: {
							'1': [3, 4, 5]
						}
					},
					{
						name: 'Elysium Eternal',
						description:
							"In Herrscher of Origin Form, Charged ATK deals an extra #1[f1]% ATK of Ice DMG. Every Charged ATK dealt increases Ultimate Finisher's additional ATK by #2[f1]% ATK of Ice DMG, up to 2 times. Exiting Herrscher of Origin Form clears all buff effects.",
						maxLv: 11,
						params: {
							'1': [50, 65, 80, 95, 110, 125, 140, 155, 170, 185, 200],
							'2': [100, 130, 160, 190, 220, 250, 280, 310, 340, 370, 400]
						}
					}
				]
			},
			basic: {
				core: {
					name: 'Shattered Transience',
					description:
						'Attack with a bow or staff.\n\nHerrscher of Human form: Use a bow to shoot arrows 4 times.\nSEQ 1: Deals 100% ATK of Ice DMG\nSEQ 2: Deals 2 x 60% ATK of Ice DMG\nSEQ 3: Deals 150% ATK of Ice DMG\nSEQ 4: Deals 200% ATK of Ice DMG\n\nHerrscher of Origin form: Use a staff to cast magic 4 times.\nSEQ 1: Deals 150% ATK of Ice DMG\nSEQ 2: Deals 8 x 40% ATK of Ice DMG\nSEQ 3: Deals 4 x 60% ATK of Ice DMG\nSEQ 4: Deals 200% ATK of Ice DMG, and then 200% ATK of Ice DMG gradually.'
				},
				subskills: [
					{
						name: 'Sparkling Hope',
						description:
							'Deal #1[f1]% more Total DMG to MECH-type enemies.\nIn Herrscher of Human form, Basic ATK (Charged ATK excluded) grants 1 Crystal Ice Mirror stack on hit, up to a maximum of 4 stacks. Crystal Ice Mirror provides Iron Body, and reduces incoming DMG by #2[f1]% at the cost of 1 stack. If no stack is gained within 15s or Herrscher of Origin form is activated, lose all Crystal Ice Mirror stacks. A battlesuit carrying Crystal Ice Mirror passes it onto the battlesuit that replace her.',
						maxLv: 11,
						params: {
							'1': [15, 16.5, 18, 19.5, 21, 22.5, 24, 25.5, 27, 28.5, 30],
							'2': [20, 23, 26, 29, 32, 35, 38, 41, 44, 47, 50]
						}
					},
					{
						name: 'Unstoppable Yearning',
						description:
							'Increases Ice DMG by #1[f1]%.\nIn Herrscher of Origin form, increases Ice DMG by another #2[f1]%, and attacks deal additional #3[f1]% ATK of DMG.',
						maxLv: 11,
						params: {
							'1': [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
							'2': [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
							'3': [10, 11.5, 13, 14.5, 16, 17.5, 19, 20.5, 22, 23.5, 25]
						}
					},
					{
						name: 'Golden Splendor',
						description:
							'QTE: Triggered when in Herrscher of Human form and an enemy is Frozen or Time-Slowed. Inflicts Pristine Bloomage and deal #1[f1]% ATK of Ice DMG. If Ultimate Evasion Skill is not in CD, it is triggered. Within 20s of QTE entry, increases Total DMG by #2[f1]%. Triggering it again refreshes the duration.',
						maxLv: 11,
						params: {
							'1': [500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000],
							'2': [6, 6.9, 7.8, 8.7, 9.6, 10.5, 11.4, 12.3, 13.2, 14.1, 15]
						}
					}
				]
			}
		},
		{
			id: 'hfs',
			version: '5.0',
			name: 'Herrscher of Flamescion',
			type: 'psychic',
			valkyrie: 'kiana',
			features: ['fire-dmg', 'heal', 'time-mastery', 'gather', 'aerial'],
			weapon: 'pistols',
			initialStar: 's',
			leader: {
				core: {
					name: "Nameless Knight-Errant's Path",
					description:
						'Leader Bonus:\nLeader Skill: Team deals 48.0% bonus Elemental DMG. Every non-Kiana battlesuit grants 30.0 bonus initial SP to the team (60.0 max; can only be triggered once every 10 minutes in Open World).'
				},
				subskills: [
					{
						name: "Nameless Knight-Errant's Path",
						description:
							'Team deals 48.0% bonus Elemental DMG. Every non-Kiana battlesuit grants 30.0 bonus initial SP to the team (60.0 max; can only be triggered once every 10 minutes in Open World).',
						requiredRank: 's3',
						maxLv: 2,
						params: {
							'1': [41, 48],
							'2': [27.5, 30.0],
							'3': [55, 60]
						}
					}
				]
			},
			passive: {
				core: {
					name: "Fiery Hymn's Pledge",
					description:
						"Passive bonuses apply automatically.\nValkyrie's Basic/Combo ATKs and Charged/Combo ATKs from teammates inflict Ember Brand lasting 6s on enemies. Ember Brand inflicted in Herrscher form deals Fire DMG equal to 5% of Valkyrie's ATK per 0.5s 10 stacks max.\nThe following attacks can detonate Ember Brand on enemies in a large area (without consuming it) to deal 120% ATK of Fire DMG: Last sequence of Herrscher form Basic ATK (CD: 2s), QTE, last sequence of base form ground Basic ATK, and Combo ATK.\nWhen in Overheat, Heat drops by 15 every 2s."
				},
				subskills: [
					{
						name: 'By Song Defended',
						description:
							"Valkyrie obtains a barrier which can absorb DMG equal to 60.0% of Valkyrie's max HP. Valkyrie no longer restores HP for herself (except from My Body, A Beacon) but restores HP for the barrier at 100.0% efficiency instead. While the barrier lasts, Valkyrie deals 10.0% bonus Total DMG, has higher Ignore Interrupt, and transfers indirect DMG taken to the barrier.",
						maxLv: 3,
						params: {
							'1': [30, 45, 60],
							'2': [50, 75, 100],
							'3': [5, 7.5, 10]
						}
					},
					{
						name: 'The Celestial Brilliance',
						description: 'Upon exit, Valkyrie slams enemies nearby on the ground dealing 400.0% ATK of Fire DMG.',
						maxLv: 11,
						params: {
							'1': [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
							'2': [12, 12.6, 13.2, 13.8, 14.4, 15, 15.6, 16.2, 16.8, 17.4, 18],
							'3': [30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30]
						}
					},
					{
						name: 'A Twilight Benediction',
						description:
							'In Herrscher form, Valkyrie deals 20.0% bonus Total DMG, has 18.0% Elemental Breach, and takes 30.0% less Total DMG.',
						maxLv: 10,
						params: {
							'1': [130, 160, 190, 220, 250, 280, 310, 340, 370, 400]
						}
					}
				]
			},
			evasion: {
				core: {
					name: "Lone Phoenix's Plume",
					description:
						'Quickly evade enemy attacks.\nUltimate Evasion triggers 4s of global Time Fracture. CD: 18s.\nGround: Evasion can be performed twice in a row.\nAirborne:Base form: Evasion can only be performed once.\nHerrscher form: No limitations on evasions.\nTap [ATK] after evasion to connect into Basic ATK Sequence 3.In Herrscher form, Ultimate Evasion inflicts 5 stacks of Ember Brand on enemies in a large area and restores 2 SP. CD: 10s.'
				},
				subskills: [
					{
						name: 'By Embers Marked',
						description: 'All evasions can trigger the Ultimate Evasion effect.',
						maxLv: 1
					},
					{
						name: 'Through Countless Years',
						description:
							"When an enemy is hit by Charged/ Combo ATKs or weapon skills from two team members in 8s, team deal 10.0% bonus Fire DMG for 15.0s and trigger Valkyrie's QTE. CD: 15.0s.",
						maxLv: 10,
						params: {
							'1': [5.0, 5.5556, 6.1111, 6.6667, 7.2222, 7.7778, 8.3333, 8.8889, 9.4444, 10.0],
							'2': [1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500],
							'3': [1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500]
						}
					},
					{
						name: 'QTE: To Awaken New Life',
						description: 'QTE: Triggered when an enemy is ignited or knocked airborne to deal 1,050% ATK of Fire DMG and restore 4.0 SP.',
						maxLv: 6,
						params: {
							'1': [500, 610, 720, 830, 940, 1050],
							'2': [2.0, 2.4, 2.8, 3.2, 3.6, 4.0]
						}
					}
				]
			},
			special: {
				core: {
					name: "Blazing Chariot's Trail",
					description:
						'Launch power attacks at 0 Heat. Heat: Starts at 0. Reduced by 21 per second when not in Overheat and by 10 per second when in Overheat.\nBase form Combo ATK: Increase 45 Heat and consume 15% of current HP to deal 300% ATK of Fire DMG, trigger 2.5s of global Time Fracture, and enter Herrscher form lasting 11.5s.In Herrscher form, Valkyrie has different moves, higher Ignore Interrupt, and loses 1% of current HP per second.\nHerrscher form Combo ATK: Increase 100 Heat and trigger 3.5s of global Time Fracture.\nGround: 1200% ATK of Fire DMG.\nAirborne: Knock enemies airborne and create a black hole gathering enemies and dealing 1200% ATK of Fire DMG.\nValkyrie enters Overheat when Herrscher form ends and Heat increases by 100. Switching out ends Herrscher form.'
				},
				subskills: [
					{
						name: 'By Fire Enthroned',
						description:
							'At 75% HP or more, Combo ATKs in base form additionally cost 30% of current HP to deal 400.0% ATK of bonus Fire DMG.',
						requiredRank: 'ss',
						maxLv: 10,
						params: {
							'2': [200.0, 222.2222, 244.4444, 266.6667, 288.8889, 311.1111, 333.3333, 355.5556, 377.7778, 400.0]
						}
					},
					{
						name: 'Crossing the Heavens',
						description:
							'Valkyrie deals 30.0% bonus Total DMG to MECH enemies. In Herrscher form, Combo ATKs deal 30.0% bonus Total DMG and 50% bonus DMG to shields.',
						maxLv: 6,
						params: {
							'1': [15, 18, 21, 24, 27, 30],
							'2': [15, 18, 21, 24, 27, 30]
						}
					},
					{
						name: "To Find Truth's Loom",
						description:
							'At 60% max HP or more, Herrscher form additionally consumes 5% max HP per second. Below 60% max HP, Valkyrie takes 35.0% less Total DMG and deals 35.0% bonus Fire DMG.',
						maxLv: 6,
						params: {
							'1': [15, 19, 23, 27, 31, 35],
							'2': [20, 23, 26, 29, 32, 35]
						}
					}
				]
			},
			ultimate: {
				core: {
					name: 'The Blade Supreme, Rekindled',
					description:
						'Launch a powerful attack.\n\nActivation cost: 75 SP. CD: 16s.Deal 2150% ATK of Fire DMG during which Valkyrie is in Herrscher form and all skill timers on her, enemies as well as the stage timer are paused. If cast in Herrscher form, Ultimate will end Herrscher form after the cast.'
				},
				subskills: [
					{
						name: 'By Flame Illuminated',
						description: 'During Overheat and on standby, Valkyrie restores 1.0 SP per second.',
						requiredRank: 's2',
						maxLv: 6,
						params: {
							'2': [0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
						}
					},
					{
						name: 'My Body, A Beacon',
						description:
							'After casting Ultimate, Valkyrie restores 12.0% max HP if her HP is below 40% and further 8.0% max HP if her HP is below 25%.',
						maxLv: 3,
						params: {
							'1': [6, 9, 12],
							'2': [4, 6, 8]
						}
					},
					{
						name: 'To Blaze Eternal',
						description: 'Ultimate deals 50.0% bonus Total DMG.',
						maxLv: 11,
						params: {
							'1': [10, 14, 18, 22, 26, 30, 34, 38, 42, 46, 50]
						}
					}
				]
			},
			basic: {
				core: {
					name: "Tempered Warrior's Strike",
					description:
						'Greatsword attacks which inflict minor Ignite Trauma.\nGround:Base form: 730% ATK of Fire DMG.\nHerrscher form: 970% ATK of Fire DMG.\nAirborne:Base form: 490% ATK of Fire DMG.\nHerrscher form: 900% ATK of Fire DMG.\nUpward Slash: 200% ATK of Fire DMG.\nDownward Slam: 30% + 90%x2 ATK of Fire DMG.'
				},
				subskills: [
					{
						name: 'By Sword Grasped',
						description: "Ember Brand's explosion deals 210.0% ATK of Fire DMG.",
						requiredRank: 'sss',
						maxLv: 10,
						params: {
							'1': [160.0, 165.5556, 171.1111, 176.6667, 182.2222, 187.7778, 193.3333, 198.8889, 204.4444, 210.0]
						}
					},
					{
						name: 'A Dawning Star',
						description:
							'Enemies nearby take 2.5% bonus Total DMG from Valkyrie (independent effect). The explosion of Ember Brand boosts this effect by 2.5% (20.0% max) until the battle ends.',
						maxLv: 10,
						params: {
							'1': [1.5, 1.6111, 1.7222, 1.8333, 1.9444, 2.0556, 2.1667, 2.2778, 2.3889, 2.5],
							'3': [12.0, 12.8889, 13.7778, 14.6667, 15.5556, 16.4444, 17.3333, 18.2222, 19.1111, 20.0]
						}
					},
					{
						name: 'To Ignite the Thunder',
						description: "After Ember Brand's explosion, base form aerial attacks restore 3.0 SP on hit (can be triggered up to 3 times).",
						maxLv: 10,
						params: {
							'1': [1.5, 1.6667, 1.8333, 2.0, 2.1667, 2.3333, 2.5, 2.6667, 2.8333, 3.0]
						}
					}
				]
			}
		}
	]
};
