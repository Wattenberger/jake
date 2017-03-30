<template>
  <div class="Home">
    <div class="title">
      <h1>Hi, I'm Jake Yates</h1>
      <p>I’m a post-doctoral fellow at the <a href="https://www.cvs.rochester.edu/" target="_blank">Center for Visual Science</a> at the University of Rochester in the labs of Jude Mitchell and Greg DeAngelis. I did my PhD work at the University of Texas, co-advised by <a href="http://pillowlab.princeton.edu/" target="_blank">Jonathan Pillow</a> and <a href="http://motion.cps.utexas.edu/" target="_blank">Alex Huk</a>.</p>
      <p>I’m interested in how sensory signals are encoded into neural activity and how that activity is decoded to form perceptions and actions. To approach this, I use a combination of electrophysiology, psychophysics and computational modeling.</p>
    </div>
    <div class="content content-blue">
      <h6>Perceptual Decision-making</h6>
      <p>Over two decades of research on perceptual decisions have resulted in a simple circuit model where oculomotor areas integrate signals from motion selective areas to form decisions about the direction of motion. I am interested in how sensory signals in area MT are read out by higher brain areas.</p>
      <p>To investigate this, I have collected a dataset of simultaneously recorded neurons in MT and parietal area LIP while a monkey performs a decision about the direction of motion. I use computational models to understand the statistical dependence of the choice on signals in each area and the dependence between areas. In collaboration with Leor Katz, I use reversible inactivation to interrogate this circuit with causal manipulations.</p>

      <h6>Sensory encoding of motion</h6>
      <p>In a collaboration with Johannes Burge and Kenneth Mitchell, I am using normative models of speed selectivity based on natural scene statistics to interpret the role of external and internal noise in the response of speed-tuned neurons in area MT.</p>
    </div>
  </div>
</template>

<script>
import "./Home.less"

export default {
  data () {
    return {
    }
  }
}
</script>
