---
slug: static-analysis-build-server-for-android-with-jenkins-using-docker
date: 2016-01-17T08:22:13.280Z
title: "Static analysis build server for Android with Jenkins using Docker"
template: "post"
categories:
  - NiceDay
tags: [Docker,Jenkins,Android]
---

We have recently been working with quite a few simultaneous android projects at [Nerdiacs](http://www.nerdiacs.com/) so I decided to setup [Jenkins](https://jenkins-ci.org/) on one of our servers. The end goal of this build server is to be able to handle multiple Android SDKs, produce release builds with Lint and perform static code analysis using [Infer](http://fbinfer.com/) by Facebook.

Now firstly, we will setup Jenkins inside a [Docker](https://www.docker.com/) container as this allows us to just copy/paste the entire environment running Jenkins to any other server should we need to scale it in the future. The only pre-requisite for setting this up is to make sure you have Docker installed on the server you want to run, as everything else would run inside the docker container.

Now, first get the Docker image by cloning [this repo](https://github.com/umarniz/Jenkins-Android-Infer).

```bash
git clone [https://github.com/umarniz/Jenkins-Android-Infer.git](https://github.com/umarniz/Jenkins-Android-Infer.git)
```

Second, we build the docker image by going into the repo directory and running the command:

```bash
docker build -t jenkins_android .
```

The final character ‘.’ here represents that we want to build the repo from the current directory. Docker looks for a “Dockerfile” in the current directory and uses the instructions in it to build the image. If you want to rename the image you can add “-t <image_name>” before the dot. This will take a bit of time as Docker will download all dependencies and build them in the container.

Once the image is built successfully you can see the images you have installed on the system by typing.

```bash
docker images
```

This should give you a list of images that are installed on the system and you should see jenkins_android in the list.

Now that you have the image ready, lets run it:

```
docker run -p 9090:8080 -v /var/jenkins:/var/jenkins_home jenkins_android
```

Now thats a handful of commands, lets break it down to see what its doing.

* `docker run` If i need to explain this, this tutorial might not be for you
* `-p 9090:8080` The -p command is used to forward ports, first one being the port on your server and the second one for the docker container. As Jenkins runs on port 8080 we are forwarding to port 9090, so you should be able to access Jenkins at yourserver.com:9090
* `-v /var/jenkins:/var/jenkins_home` The -v command is for binding a volume where the path `/var/jenkins` will be the directory on your server and `/var/jenkins_home` will be inside the docker container. Simply put all files you (or jenkins) create in the docker container at `/var/jenkins_home` will also be accessible at `/var/jenkins` on your server!

Congratulations you have successfully ran a Jenkins image inside a Docker container on your server! Check it out at yourserver.com:9090
  