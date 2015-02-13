var moveConts = 1000;


var coordMap = function(coord,nextCoord,scale,i,dir){

                        var vector = [(nextCoord[0]-coord[0]),(nextCoord[1]-coord[1])];
                        var unitVector = Math.sqrt((vector[0]*vector[0])+(vector[1]*vector[1]));
                        unitVector *= scale;
                        vector = [vector[0]/unitVector, vector[1]/unitVector];
                        

                        if(dir[0] !== 'f' || dir[0] !== 'F')
                           vector = [-vector[1],vector[0]];
                        else 
                            vector = [vector[1],-vector[0]];

                        
                        return [coord[0]+vector[0],coord[1]+vector[1]];       
                }

var coordProcess = function(line,orientation){
                        var new_coordinates = line.map(function(coord,i){

                                                if(line[i+1]){
                                                    var nextCoord = line[i+1];
                                                        return coordMap(coord,nextCoord,moveConts,i,'backward');                        
                                                    
                                                }else{
                                                    var nextCoord = coord;
                                                    coord = line[i-1];
                                                    return coordMap(nextCoord,coord,moveConts,i,'forward');
                                                }

                                            });
                                            return new_coordinates;        
                    }

var vectorsol = function(f,i){
            if(i < 1000){
                var testGeom = f.geometry;
               // console.log(f);

                if(testGeom.type ==='LineString'){
                    var new_coordinates = coordProcess(testGeom.coordinates);
                }else if(testGeom.type === 'MultiLineString'){
                    var new_coordinates = [];
                    var orientation;
                    testGeom.coordinates.forEach(function(line,i){
                        
                        new_coordinates.push(coordProcess(line,'out'));
                    })
                }
                testGeom.coordinates = new_coordinates;
                f.geometry = testGeom;
                return f;
            }
            return;
        }