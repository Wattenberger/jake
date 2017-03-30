<template>
  <div class="Publications">
    <div class="title">
      <h1>Publications</h1>
    </div>
    <div class="content">
	    <div class="publication" v-for="publication in publications">
	      <a :href="publication.link" class="publication-link no-link-styles" target="_blank">
	    	<h6 class="publication-journal">
	    		{{ publication.journal }} ({{ publication.year }})
	    		<span class="page">{{ publication.page }}</span>
	    	</h6>
	    	<h3 class="publication-title">{{ publication.title }}</h3>
	    	<div class="publication-authors">{{ publication.authors }}</div>

	      </a>
	      <div v-if="publication.highlights" class="publication-highlights">
		    <a :href="highlight.link" class="publication-highlight no-link-styles" target="_blank" v-for="highlight in publication.highlights">
	      		<div>
	      			{{ highlight.title }}
	      			<span v-if="highlight.where">in
	      				<span class="publication-highlight-where">{{ highlight.where }}</span>
	      			</span>
	  			</div>
	      		<div>{{ highlight.authors }}</div>
	      	</a>
	      </div>
	      </div>
	      <div class="footnote">* Authors contributed equally</div>
    </div>
  </div>
</template>

<script>
import "./Publications.less"

const publications = [
	{
		authors: "Katz, L.N.*, Yates, J.L.*, Pillow, J.W., & Huk, A.C.",
		year: 2016,
		title: "Dissociated functional significance of decision-related activity in the primate dorsal stream",
		journal: "Nature",
		page: "535: 285–288",
		link: "http://www.nature.com/nature/journal/v535/n7611/full/nature18617.html",
		highlights: [
			{
				title: "Spotlight",
				where: "Trends in Neurosciences",
				authors: "Bijan Pesaran & David Freedman",
				link: "http://www.cell.com/trends/neurosciences/fulltext/S0166-2236(16)30099-6",
			},
			{
				title: "Spotlight",
				where: "Trends in Cognitive Sciences",
				authors: "Sashank Pisupati, Lital Chartarifsky, & Anne K. Churchland",
				link: "http://www.cell.com/trends/cognitive-sciences/fulltext/S1364-6613(16)30148-6",
			},
			{
				title: "Faculty of 1000 (F1000Prime) entry",
				authors: "Daeyeol Lee",
				link: "http://f1000.com/prime/726482747",
			},
			{
				title: "Research Highlight",
				where: "Nature Reviews Neuroscience",
				link: "http://www.nature.com/nrn/journal/vaop/ncurrent/full/nrn.2016.108.html"
			},
			{
				title: "Relevant review article",
				where: "Current Opinion in Neurobiology",
				authors: "Carlos Brody & Tim Hanks",
				link: "http://www.sciencedirect.com/science/article/pii/S0959438816000040",
			}
		]
	},
	{
		authors: "Latimer, K. W., Yates, J. L., Meister, M. M., Huk, A. C., and Pillow, J. W.",
		year: 2016,
		title: "Response to comment on “single-trial spike trains in parietal cortex reveal discrete steps during decision-making”",
		journal: "Science",
		page: "351(6280):1406",
		link: "http://science.sciencemag.org/content/351/6280/1406.3.long",
	},
	{
		authors: "Latimer, K. W., Yates, J. L., Meister, M. L., Huk, A. C., & Pillow, J. W.",
		year: 2015,
		title: "Single-trial spike trains in parietal cortex reveal discrete steps during decision-making",
		journal: "Science",
		page: "349(6244), 184-187",
		link: "http://www.sciencemag.org/content/349/6244/184.abstract",
	},
	{
		authors: "Bonnen, K., Burge, J., Yates, J. L., Pillow, J. W., & Cormack, L. K.",
		year: 2015,
		title: "Continuous Psychophysics: Target-tracking to Measure Visual Sensitivity",
		journal: "Journal of Vision",
		page: "15(3), 14",
		link: "http://jake.vision/wp-content/uploads/2015/04/Bonnen15_JOV_kalmantracking.pdf",
		pdf: true,
	},
	{
		authors: "Huk, A.C., Katz, L.N., & Yates, J.L.",
		year: 2015,
		title: "Accumulation of evidence in decision making.",
		journal: "Encyclopedia of Computational Neuroscience",
		bookAuthors: "Jaeger, D. & Jung, R., Eds., Springer",
		link: "http://www.springer.com/biomed/neuroscience/book/978-1-4614-6674-1",
	},
	{
		authors: "Knudson, K. C., Yates, J., Huk, A., & Pillow, J. W.",
		year: 2014,
		title: "Inferring sparse representations of continuous signals with continuous orthogonal matching pursuit",
		journal: "Advances in Neural Information Processing Systems",
		page: "pp. 1215-1223",
		link: "http://jake.vision/wp-content/uploads/2014/12/5264-inferring-sparse-representations-of-continuous-signals-with-continuous-orthogonal-matching-pursuit.pdf",
		pdf: true,
	},
	{
		authors: "Ales, J. M., Yates, J. L., & Norcia, A. M.",
		year: 2013,
		title: "On determining the intracranial sources of visual evoked potentials from scalp topography: A reply to Kelly et al.(this issue)",
		journal: "NeuroImage",
		page: "64, 703-711",
		link: "http://jake.vision/wp-content/uploads/2014/12/Ales-2013-NeuroImage.pdf",
		pdf: true,
	},
	{
		authors: "Ales, J. M., Yates, J. L., & Norcia, A. M.",
		year: 2010,
		title: "V1 is not uniquely identified by polarity reversals of responses to upper and lower visual field stimuli",
		journal: "Neuroimage",
		page: "52(4), 1401-1409",
		link: "http://jake.vision/wp-content/uploads/2014/12/Ales-2010-NeuroImage.pdf",
		pdf: true,
	}
]

export default {
  data () {
    return {
    	publications
    }
  }
}
</script>
