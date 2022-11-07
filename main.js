scoreLeftWrist=0;
scoreRightWrist=0;
leftWrist_x=0;
rightWrist_x=0;
leftWrist_y=0;
rightWrist_y= 0;
song="";

function preload()
{
    song=loadSound("Never Gonna Give You Up Original.mp3");
}

function setup()
{
    canvas=createCanvas(600, 500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw()
{
    image(video, 0, 0, 600, 500);
    fill("#e33e32");
    stroke("#e33e32");
    if(scoreRightWrist>0.2)
    {
        circle(rightWrist_x, rightWrist_y, 20);
        if(rightWrist_y>0&&rightWrist_y<=100) 
        {
          document.getElementById("speed").innerHTML="speed=0.5x";
          song.rate(0.5);
        }

        else if(rightWrist_y>100&&rightWrist_y<=200) 
        {
          document.getElementById("speed").innerHTML="speed=1x";
          song.rate(1);
        }

        else if(rightWrist_y>200&&rightWrist_y<=300) 
        {
          document.getElementById("speed").innerHTML="speed=1.5x";
          song.rate(1.5);
        }

        else if(rightWrist_y>300&&rightWrist_y<=400) 
        {
          document.getElementById("speed").innerHTML="speed=2x";
          song.rate(2);
        }

        else if(rightWrist_y>400) 
        {
          document.getElementById("speed").innerHTML="speed=2.5x";
          song.rate(2.5);
        }
    }

    if(scoreLeftWrist>0.2)
    {
        circle(leftWrist_x, leftWrist_y, 20);
        numberLeftWristY=Number(leftWrist_y);
        removeDecimals=floor(numberLeftWrist_y);
        volume=removeDecimals/500;
        document.getElementById("volume").innerHTML="volume=" + volume;
        song.setVolume(volume);
    }
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded()
{
    console.log("Model Loaded");
}

function gotPoses(results)
{
    if(results.length>0)
    {
       console.log(results);
       leftWrist_x=results[0].pose.leftWrist.x;
       leftWrist_y=results[0].pose.leftWrist.y;
       rightWrist_x=results[0].pose.rightWrist.x;
       rightWrist_y=results[0].pose.rightWrist.y;
       scoreLeftWrist=results[0].pose.keypoints[9].score;
       scoreRightWrist=results[0].pose.keypoints[10].score;
    }

    
}
