// ring

petals = 10;

for (i = [0:petals-1]) {
    rotate([0, 0, 360 / petals * i]) {
        translate([50  , 0, 0])
          cylinder(h = 6, r = 10, center = true);
    }
}




// petals = 10;

// for (i = [0:petals-1]) {
//     rotate([0, 0, 360 / petals * i]) {
//         translate([20, 0, 0])
//           cylinder(h = 6, r = 10, center = true);
//     }
// }
