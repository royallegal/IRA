
<h3>Cards</h3>
<h6>Simple example</h6>
<div class="row">
    <div class="col m4">
        <div class="card">
            <div class="card-content">
              <span class="card-title">Card Title</span>
              <p>I am a very simple card. I am good at containing small bits of information.
              I am convenient because I require little markup to use effectively.</p>
            </div>
            <div class="card-action">
                <a class="blue mix center-align button" href="">The action</a>
            </div>
        </div>
    </div>
    <div class="col m4">
        <div class="card">
            <div class="card-image">
              <img src="https://lorempixel.com/500/400/">
              <span class="card-title">Card Title</span>
            </div>
            <div class="card-content">
              <p>I am a very simple card. I am good at containing small bits.</p>
            </div>
            <div class="card-action">
                <a class="blue mix center-align button" href="">The action</a>
            </div>
        </div>
    </div>
    <div class="col m4">
        <div class="card horizontal">
        <div class="card-image">
            <img src="https://lorempixel.com/100/190/nature/6">
        </div>
        <div class="card-stacked">
            <div class="card-content">
            <p>I am a very simple card. I am good at containing small bits of information  of information.</p>
            </div>
            <div class="card-action">
            <a href="#">This is a link</a>
            </div>
        </div>
        </div>
    </div>
</div>

<h6>Fixed height</h6>
<?php $cardSizes = array("small", "medium", "large") ?>
<div class="row">
    <?php foreach($cardSizes as $size): ?>
    <div class="col m4">
        <div class="card <?=$size?>">
            <div class="card-content">
              <span class="card-title">Small</span>
              <p>Use the class <code>.card.<?=$size?></code>. I am a very simple card. I am good at containing small bits of information.
              I am convenient because I require little markup to use effectively. I am a very simple card. I am good at containing small bits of information.
              I am convenient because I require little markup to use effectively.</p>
            </div>
            <div class="card-action">
                <a class="blue mix center-align button" href="">The action</a>
            </div>
        </div>
    </div>
    <?php endforeach; ?>
</div>
