<template>
  <div class="CV">
    <div class="title">
      <h1>CV</h1>
    </div>

    <div class="content">
      <div class="section" v-for="section in cv">
      	<h3>{{ section.title }}</h3>
      	
      	<div class="item" v-if="section.title == 'Publications'">
      		<Publications />
  		</div>
      	<div class="item" v-for="item in section.items">
      		<h6 class="item-title">
      			<div>{{ item.where }}</div>
      			<div class="item-when">{{ item.when }}</div>
  			</h6>
  			<div class="item-title">{{ item.title }}</div>
  			<div class="item-who">{{ item.who }}</div>
  			<div class="item-footnote">{{ item.footnote }}</div>
      	</div>
      </div>
    </div>
  </div>
</template>

<script>
import "./CV.less"
import Publications from "./Publications.vue"

const cv = [
  {
  	title: "Education",
  	items: [
  	  {
  	  	title: "The University of Texas at Austin",
  	  	when: "2010 - 2016",
  	  	footnote: "Ph.D., Neuroscience",
  	  },{
  	  	title: "University of California, Berkeley",
  	  	when: "2004 - 2007",
  	  	footnote: "B.A., Major: Psychology",
  	  }
  	]
  },{
  	title: "Research Experience",
  	items: [
  	  {
  	  	title: "Post-Doctoral Fellow",
  	  	where: "The University of Rochester",
  	  	when: "2016 - present",
  	  },{
  	  	title: "Graduate Research Assistant",
  	  	where: "The University of Texas at Austin",
  	  	when: "2010 - 2016",
  	  },{
  	  	title: "Research Assistant",
  	  	where: "The Smith-Kettlewell Eye Research Institute",
  	  	when: "2009 - 2010",
  	  }
  	]
  },{
  	title: "Publications",
  	template: Publications,
  },{
  	title: "Talks",
  	items: [
  		{
  			title: "Choice probabilities and correlations in simultaneously recorded MT and LIP neurons",
  			when: "2014",
  			where: "SFN",
  			who: "Yates, J.L, Katz, L. N., Park, I. M., Pillow, J. W., & Huk, A. C.",

  		},{
  			title: "Dissociated functional signiﬁcance of choice-related activity across the primate dorsal stream",
  			when: "2014",
  			where: "Cosyne",
  			who: "Yates, J. L., Katz L. K., Park, I. M., Pillow J. W., Huk A.",

  		},{
  			title: "Decision-related activity in neurons does not imply a causal effect on behavior",
  			when: "2014",
  			where: "Institute for Neuroscience Symposium",
  			who: "Yates, J. L., Katz L. K., Park, I. M., Pillow J. W., Huk A.",
  			tag: "invited",
  		}
  	]
  },{
  	title: "Posters",
  	items: [
	  {
	  	title: "A behavioral tracking paradigm for estimating visual sensitivity with dynamic internal models",
	  	authors: "Bonnen K., Burge J., Yates J. L., Pillow J. W., Cormack L. K.",
	  	where: "Cosyne",
	  	when: "2014",
	  },{
	  	title: "Precise characterization of dorsal stream neural activity during decision making",
	  	authors: "Yates J. L., Park I. M., Cormack L. K., Pillow J. W., Huk, A. C.",
	  	where: "SFN",
	  	when: "2013",
	  },{
	  	title: " A. C. Neuromuscular recruitment during oculomotor decision-making in human",
	  	authors: "Katz. L. N., Yates J. L., Cormack L. K., Huk",
	  	where: "SFN",
	  	when: "2013",
	  },{
	  	title: " A. C. Precise characterization of multiple LIP neurons in relation to stimulus and behavior",
	  	authors: "Yates J. L., Park I. M., Cormack L. K., Pillow J. W., Huk",
	  	where: "Cosyne",
	  	when: "2013",
	  },{
	  	title: "Psychophysical reverse correlation of motion perception",
	  	authors: "Yates, J. L., Huk A. C., Cormack L. K., Pillow J. W.",
	  	where: "VSS",
	  	when: "2012",
	  },{
	    title: "Probing motion perception with spatiotemporal reverse correlation",
	    authors: "Yates J. L., Cormack L. K., Huk A. C., Pillow J. W.",
	    where: "Cosyne",
	    when: "2012",
	},{
	  	title: "An evoked-response polarity reversal from upper and lower visual field stimuli is insufficient to uniquely identify V1",
	  	authors: "Ales J. M., Yates J. L., Norcia A. M.",
	  	where: "SFN",
	  	when: "2009",
	  },
  	]
  },{
  	title: "Service",
  	items: [
  	  {
  	  	title: "Graduate Student Outreach Program",
  	  	where: "UT Neuroscience and Psychology",
  	  	when: "2010 - 2014",
  	  },{
  	  	title: "Symposium Organizing Committee",
  	  	where: "UT Institute for Neuroscience",
  	  	when: "2011 - 2013",
  	  },{
  	  	title: "Symposium Chair",
  	  	where: "UT Institute for Neuroscience",
  	  	when: "2012",
  	  },{
  	  	title: "Graduate Student Assembly representative",
  	  	where: "UT Austin College of Natural Sciences",
  	  	when: "2010 - 2011",
  	  }
  	]
  },{
  	title: "Honors & Awards",
  	items: [
  	  {
  	  	title: "Professional Development Award",
  	  	where: "UT Austin College of Natural Sciences",
  	  	when: "2015",
  	  },{
  	  	title: "Cold Spring Harbor Labs course attendee",
  	  	where: "Neuroscience: Computational Vision",
  	  	when: "2014",
  	  },{
  	  	title: "Training Grant recipient",
  	  	where: "Center for Perceptual Neuroscience",
  	  	when: "2012 - 2014",
  	  },{
  	  	title: "Training Grant recipient",
  	  	where: "Institute for Neuroscience",
  	  	when: "2010 - 2012",
  	  },{
  	  	title: "Deans’s Excellence Award",
  	  	where: "UT Austin College of Natural Science",
  	  	when: "2010",
  	  },{
  	  	title: "Graduate School Recruitment Fellowship",
  	  	where: "UT Austin College of Natural Science",
  	  	when: "2010",
  	  },{
  	  }
  	]
  }
] 

export default {
  data () {
    return {
    	cv
    }
  },
  components: {
    Publications,
  },
}
</script>
