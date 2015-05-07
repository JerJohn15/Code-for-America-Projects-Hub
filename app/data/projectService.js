cfahubServices.factory('ProjectService', ProjectService);

ProjectService.$inject = ['CFAProjectsService', 'GithubProjectsService', 'GoogleProjectsService'];

function ProjectService(CFAProjectsService, GithubProjectsService, GoogleProjectsService) {
    return {
      getProjects: getProjects,
      getProject: getProject
    };

    function getProjects() {
      var projects = [];

      return GoogleProjectsService.getApprovedProjects()
        .then(function(data) {
          projects.push(data.data);
          return CFAProjectsService.getProjects();
        })
        .then(function(data) {
          projects.push(data.data.objects);
          projects = [mergeServices(projects, 'github_html_url', 'code_url')]
          return GithubProjectsService.getProjects();
        })
        .then(function(data) {
            projects.push(data.data);
            projects = mergeServices(projects, 'github_html_url', 'html_url');
            return projects;
        });

        function mergeServices(data, xkey, ykey) {
           projects = [];
           angular.forEach(data[0], function(v, k) {
              // v = object
              angular.forEach(data[1], function(value, key) {
                // value = object
                if(v[xkey] == (value[ykey]).replace('.github.io')) {
                  // merge on keys
                  merged = angular.extend(v, key = value);
                  projects.push(merged);
                }
              });
            });
            return projects;
        }
    }

    function getProject(projectId) {
        var projects, project;
        return getProjects().then(function(data) {
            projects = data;
            for (i = 0; i < projects.length; i++) {
              project = projects[i];
              if(project['id'] == projectId) {
                return project;
              }
            }
            return project;
        });
    }

   function mockProjects() {
       this.projects = [{
                "id":"0",
                "projecttype":"project",
                "image":"assets/images/OK_placeholder_project_image.png",
                "city":"Project City",
                "title":"Project Title",
                "subtitle":"Project Subtitle",
                "category":"Civic category",
                "goals":"The first paragraph from GitHb readme. Project goals. One paragraph of text describing why people need to use this app/website. The first four lines of text are displayed in the card view. The rest is available in details.",
                "target_audiences":"1. New brigade members<br>2. Established brigade members<br>3. Brigades across the nation<br>4. Civic-minded public",
                "user_stories":"<p>Dave is a member of brigade living in Kansas City. He does not have time to follow the latest developments in the brigade on a daily basis. He would like to choose where he can apply his skills for a few hours during Monday hack night. Dave does not need to see project details, rather where the help is needed. He opens Projects Hub and chooses an active project with relevant Help Wanted issues, where he can contribute.</p><p>Ashley has a great idea about building up community spaces in Kansas City. She does not know how to build an app for it, and thinks Code for America might help. Ashley opens the Projects Hub, filters Community projects and sees that similar, but not quite the same project is under development in Munich, Germany. She presses the big blue button on the Projects Hub and adds the idea for KC brigade to develop.</p><p>Kevin, DB admin at MicroBucks, Inc., has found out about Code for America on a date with Ashley. He is curious about Ashley and the idea behind civic coding, and would like to learn more about both. He also would like to improve his JavaScript skills. Kevin opens the ProjectsHub, finds all the projects in Kansas City, where Javascript help is wanted. One of them has Ashley as a contributor. Kevin chooses to work on this project.</p><p>Jim, is geomapping guru, has been out of work for a few months. He is looking for a challenging project to showcase his skills and to build up his portfolio. He finds one under development in Buenos Aires brigade.</p>",
                "maintenance_plan":"<p>Project leaders for active projects will be able to keep the the data updated on GitHub, using the usual GitHub tools. Additional requirement for GitHub is making custom set of GitHub repo labels (see <a href='https://github.com/codeforkansascity/Code-for-America-Projects-Hub/issues/8'>Custom Labels for Repos</a> on GitHub).  </p><p>Project Definition information can be updated either via Google form, when the project is created, or via Google miniforms, once project is established, or by editing Google spreasheet directly.</p>",
                "potential_blockers":"<p>Maintenance related blockers: The workflow for updating project information in Google spreadsheet is clumsy (Google form does not pull data back from the spreadsheet, if data exists already).</p><p>The initial effort of creating custom repo labels and then applying them to repo issue, when the issue is created requires some discipline from project leader. </p>",
                "stars":"#",
                "followers":"#",
                "comments":"#",
                "active":"Not online yet",
                "platform":"platform",
                "techstack":"technology stack",
                "url":"#/",
                "issues":[{"id":"30","descrip":"links to issues on GitHub where the help is wanted"}],
                "contributors":[
                    {"leader":1,"img":"assets/images/person_thumb_40x40.png"},
                    {"img":"assets/images/person_thumb_40x40.png"},
                    {"img":"https://avatars3.githubusercontent.com/u/10410203?v=3&s=460"}]
        },
    {
                "id":"1",
                "projecttype":"project",
                "image":"https://cloud.githubusercontent.com/assets/10410203/6736267/bd3309ac-ce31-11e4-905b-aef21486975f.png",
                "city":"Kansas City",
                "title":"Community KC",
                "subtitle":"Map of projects funded by Community Capital Fund",
                "category":"Community",
                "goals":"The Community Capital Fund and our partners have realized through our work that a map of existing community-based projects does not exist and that often, neighborhood associations and organizations are not aware of projects/programs occurring near them, and often do not know of other organizations doing similar work. CCF believes that neighborhoods that partner with and learn from others doing similar work will have greater capacity, opportunities, and resources to carry out their work; will have a greater impact on community development and revitalization than when working in a silo; and will have a more sustained, long-term impact.",
                "target_audiences":"1. New brigade members<br>2. Established brigade members<br>3. Brigades across the nation<br>4. Civic-minded public",
                "user_stories":"<p>Dave is a member of brigade living in Kansas City. He does not have time to follow the latest developments in the brigade on a daily basis. He would like to choose where he can apply his skills for a few hours during Monday hack night. Dave does not need to see project details, rather where the help is needed. He opens Projects Hub and chooses an active project with relevant Help Wanted issues, where he can contribute.</p><p>Ashley has a great idea about building up community spaces in Kansas City. She does not know how to build an app for it, and thinks Code for America might help. Ashley opens the Projects Hub, filters Community projects and sees that similar, but not quite the same project is under development in Munich, Germany. She presses the big blue button on the Projects Hub and adds the idea for KC brigade to develop.</p><p>Kevin, DB admin at MicroBucks, Inc., has found out about Code for America on a date with Ashley. He is curious about Ashley and the idea behind civic coding, and would like to learn more about both. He also would like to improve his JavaScript skills. Kevin opens the ProjectsHub, finds all the projects in Kansas City, where Javascript help is wanted. One of them has Ashley as a contributor. Kevin chooses to work on this project.</p><p>Jim, is geomapping guru, has been out of work for a few months. He is looking for a challenging project to showcase his skills and to build up his portfolio. He finds one under development in Buenos Aires brigade.</p>",
                "maintenance_plan":"<p>Project leaders for active projects will be able to keep the the data updated on GitHub, using the usual GitHub tools. Additional requirement for GitHub is making custom set of GitHub repo labels (see <a href='https://github.com/codeforkansascity/Code-for-America-Projects-Hub/issues/8'>Custom Labels for Repos</a> on GitHub).  </p><p>Project Definition information can be updated either via Google form, when the project is created, or via Google miniforms, once project is established, or by editing Google spreasheet directly.</p>",
                "potential_blockers":"<p>Maintenance related blockers: The workflow for updating project information in Google spreadsheet is clumsy (Google form does not pull data back from the spreadsheet, if data exists already).</p><p>The initial effort of creating custom repo labels and then applying them to repo issue, when the issue is created requires some discipline from project leader. </p>",
                "stars":"1",
                "followers":"7",
                "comments":"0",
                "active":"Online",
                "platform":"Web App",
                "techstack":"JavaScript, HTML, CSS",
                "url":"http://codeforkc.org/civic-project-mapping/",
                "issues":[{"id":"58","descrip":"Organizations with multiple locations, what is the best way to input and display."},
                    {"id":"56","descrip":"When there are to many pins on the map, cluster them."},
                    {"id":"54","descrip":"Consider BootLeaf"},
                    {"id":"52","descrip":"Make it easier to change the Question Labels"},
                    {"id":"31","descrip":"Test usage on phones"},
                    {"id":"29","descrip":"Search by project name"},
                    {"id":"27","descrip":"Usability/Interaction Design/Visual Design/Information Architecture"},
                    {"id":"26","descrip":"Update About page"},
                    {"id":"24","descrip":"Add neighborhood names on the map."},
                    {"id":"20","descrip":"satellite/earth view/street view"},
                    {"id":"14","descrip":"Add a project detail page"}],
                "contributors":[
                    {"leader":1,"img":"https://avatars1.githubusercontent.com/u/447024?v=3&s=460"},
                    {"img":"https://avatars1.githubusercontent.com/u/4423980?v=3&s=460"},
                    {"img":"https://avatars1.githubusercontent.com/u/9424270?v=3&s=460"},
                    {"img":"https://avatars2.githubusercontent.com/u/5474002?v=3&s=460"}]
        },
    {
                "id":"2",
                "projecttype":"project",
                "image":"https://cloud.githubusercontent.com/assets/10410203/6722567/201f8f32-cdaa-11e4-9fc4-01b66f0d1a95.png",
                "city":"Kansas City",
                "title":"Code for America Projects Hub",
                "subtitle":"and where you can help",
                "category":"Code for America Brigade Tool",
                "goals":"To help brigade members to find projects to work on. Multi-brigade collaboration. New members onboarding. Let public contribute ideas. Karma. Code for America scope view. Provide filtered and sorted card list of projects and ideas for development. The list should be available nation-wide and by city.",
                "target_audiences":"1. New brigade members<br>2. Established brigade members<br>3. Brigades across the nation<br>4. Civic-minded public",
                "user_stories":"<p>Dave is a member of brigade living in Kansas City. He does not have time to follow the latest developments in the brigade on a daily basis. He would like to choose where he can apply his skills for a few hours during Monday hack night. Dave does not need to see project details, rather where the help is needed. He opens Projects Hub and chooses an active project with relevant Help Wanted issues, where he can contribute.</p><p>Ashley has a great idea about building up community spaces in Kansas City. She does not know how to build an app for it, and thinks Code for America might help. Ashley opens the Projects Hub, filters Community projects and sees that similar, but not quite the same project is under development in Munich, Germany. She presses the big blue button on the Projects Hub and adds the idea for KC brigade to develop.</p><p>Kevin, DB admin at MicroBucks, Inc., has found out about Code for America on a date with Ashley. He is curious about Ashley and the idea behind civic coding, and would like to learn more about both. He also would like to improve his JavaScript skills. Kevin opens the ProjectsHub, finds all the projects in Kansas City, where Javascript help is wanted. One of them has Ashley as a contributor. Kevin chooses to work on this project.</p><p>Jim, is geomapping guru, has been out of work for a few months. He is looking for a challenging project to showcase his skills and to build up his portfolio. He finds one under development in Buenos Aires brigade.</p>",
                "maintenance_plan":"<p>Project leaders for active projects will be able to keep the the data updated on GitHub, using the usual GitHub tools. Additional requirement for GitHub is making custom set of GitHub repo labels (see <a href='https://github.com/codeforkansascity/Code-for-America-Projects-Hub/issues/8'>Custom Labels for Repos</a> on GitHub).  </p><p>Project Definition information can be updated either via Google form, when the project is created, or via Google miniforms, once project is established, or by editing Google spreasheet directly.</p>",
                "potential_blockers":"<p>Maintenance related blockers: The workflow for updating project information in Google spreadsheet is clumsy (Google form does not pull data back from the spreadsheet, if data exists already).</p><p>The initial effort of creating custom repo labels and then applying them to repo issue, when the issue is created requires some discipline from project leader. </p>",
                "stars":"2",
                "followers":"8",
                "comments":"1",
                "active":"Idea",
                "platform":"Web App",
                "techstack":"HTML, CSS",
                "url":"http://codeforkc.org/Code-for-America-Projects-Hub/",
                "issues":[
                    {"id":"17","descrip":"Projects Hub filter. Where does the data come from?"},
                    {"id":"16","descrip":"Script to display entered project data from Google spreadsheet in Google form to edit the data"},
                    {"id":"11","descrip":"Add infinite scroll to the hub"},
                    {"id":"7","descrip":"Usability evaluation"},
                    {"id":"8","descrip":"Custom labels for repo issues"},
                    {"id":"9","descrip":"Project card data. Where does the data come from?"},
                    {"id":"6","descrip":"Coding projects filter"},
                    {"id":"4","descrip":"Map geolocation filter"}],
                "contributors":[
                    {"leader":1,"img":"https://avatars2.githubusercontent.com/u/10410203?v=3&s=460"},
                    {"img":"https://avatars1.githubusercontent.com/u/447024?v=3&s=460"},
                    {"img":"https://avatars1.githubusercontent.com/u/212227?v=3&s=460"},
                    {"img":"https://avatars3.githubusercontent.com/u/3280502?v=3&s=460"},
                    {"img":"https://avatars0.githubusercontent.com/u/2244915?v=3&s=460"}]
        }];
   }
};
