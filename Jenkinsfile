node{
   stage('Checkoutscm'){
      checkout scm
   }
   stage('build'){
       echo 'pipeline'
       if (isUnix()) {
              sh './gradlew clean build'
          } else {
              bat 'gradlew.bat clean build'
          }
   }

}