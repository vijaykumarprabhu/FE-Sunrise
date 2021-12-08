import React, { useContext } from "react";
import { UserContext } from "../../UserProvider";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { usersContainerStyles } from "./styles";
import { IMGURL } from "../../utils";
import { Card } from "@mui/material";
import { useLocation} from 'react-router-dom';

const Users = () => {
	const [users] = useContext(UserContext);
	let searchtTerm = useLocation().search.slice(12)

	const renderCard = (user) => (
		<Card style={{ marginBottom: 20 }}>
			<CardContent>
				<div style={{ display: "flex", alignItems: "center" }}>
					<Avatar
						alt={user.name.charAt(0)}
						src={IMGURL}
						sx={{ width: 100, height: 100 }}
					>
						<Typography variant="h5">
							{user.name.charAt(0).toUpperCase()}
						</Typography>
					</Avatar>
					<div style={{ flexDirection: "column", marginLeft: 35 }}>
						<Typography
							data-testid="user-name"
							align="left"
							variant="h6"
							style={{ color: "#AD0F5B" }}
						>
							{user.name}
						</Typography>
						<Typography
							data-testid="user-role"
							align="left"
							variant="subtitle1"
							style={{ color: "#808080" }}
						>
							{user.role}
						</Typography>
						<Typography data-testid="user-team" align="left" ariant="subtitle1">
							@{user.team}
						</Typography>
					</div>
				</div>
			</CardContent>
		</Card>
	);
	return (
		<div style={usersContainerStyles}>
			{users.length ? (
				<Grid container spacing={3} style={{ marginTop: 40 }}>
					{users.filter((val)=>{
                    if(searchtTerm == ""){
                    return val
                    }
                    else if(
                        (val.name.toLowerCase().includes(searchtTerm.toLowerCase())) || 
                        (val.role.toLowerCase().includes(searchtTerm.toLowerCase())) || 
                        (val.group.toLowerCase().includes(searchtTerm.toLowerCase())) ||
                        (val.team.toLowerCase().includes(searchtTerm.toLowerCase())) ||
                        (val.location.toLowerCase().includes(searchtTerm.toLowerCase()))
                    ){
                    return val;
                    }
                }).map((user) => (
						<Grid item key={user.id} xs={12} md={6} lg={4}>
							<Link
								to={`/user/${user.id}`}
								data-testid="userCard"
								style={{ textDecoration: "none" }}
							>
								{renderCard(user)}
							</Link>
						</Grid>
					))}
				</Grid>
			) : (
				"No users to display"
			)}
		</div>
	);
};

export default Users;
