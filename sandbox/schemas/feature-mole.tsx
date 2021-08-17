export const featureMoleSchema = {
  schema: `# ddd

	"""
	Request Issue help
	"""
	type FeatureRequest{
		"""
		date of creation
		"""
		createdAt: String!
		"""
		Representative title of the issue in git portal
		"""
		title: String!
		"""
		extra info about the issue and the worms and/or money offered for resolving the issue
		"""
		content: String!
		"""
		comments on this issue
		"""
		comments: [Comments!]!
		"""
		author of the feature request
		"""
		createdBy: MoleUser!
		"""
		git repository url
		"""
		repositoryURL: String!
		"""
		worms offered for resolution of the issue
		"""
		offeredWorms: Int!
		"""
		issueURL is the primary key. It points to the issue inside git portal
		"""
		issueURL: String!
		"""
		programming languages to be used to solve the issue
		"""
		languages: [ProgrammingLanguage!]!
	}
	
	input CreateFeatureRequest{
		"""
		Extra information for featuremole.com users
		"""
		content: String!
		"""
		git repository url
		"""
		repositoryURL: String!
		"""
		url of the issue in the repository
		"""
		issueURL: String
		"""
		programming languages to be used to solve the issue
		"""
		languages: [String!]!
	}
	
	input CreateComment{
		"""
		content of the comment
		"""
		content: String!
		"""
		If replying to another comment provide its index
		"""
		replyToIndex: Int
		"""
		feature request issue URL
		"""
		featureRequest: String!
	}
	
	"""
	Comment on featuremole.com portal
	"""
	type Comments{
		createdAt: String!
		"""
		primary key. Index of the comment
		"""
		index: Int!
		"""
		content of the comment
		"""
		content: String!
		replyTo: Comments
		featureRequest: FeatureRequest!
	}
	
	type Query{
		"""
		Feature requests displayed on the home page
		"""
		home: [FeatureRequest!]!
		"""
		Queries for logged in users
		"""
		user: UserQuery
		"""
		detail view of the feature request. Should be used to fetch comments
		"""
		featureRequest(
			featureRequest: String!
		): FeatureRequest
		moleUserQuery: MoleUserQuery
	}
	
	type MoleUserMutation{
		"""
		create new feature request
		"""
		createFeatureRequest(
			featureRequest: CreateFeatureRequest!
		): Boolean
		"""
		create comment underneath the feature request or another comment
		"""
		createComment(
			comment: CreateComment!
		): Boolean
		"""
		offer a deal request
		"""
		offerDealRequest(
			request: CreateDealRequest!
		): Boolean
		"""
		accept offered deal request
		"""
		acceptDealRequest(
			request: String!
		): Boolean
		"""
		close deal after the task is done by the supplier
		"""
		closeDeal(
			deal: String!
		): Boolean
		"""
		finish working on the feture request
		"""
		finishWork(
			deal: String!
		): Boolean
	}
	
	type Mutation{
		"""
		pipe to user related mutations in users system
		"""
		user: UserMutation
		"""
		pipe to mole user mutations
		"""
		moleUser: MoleUserMutation
		"""
		sign up a new MoleUser
		"""
		signUp(
			user: SignUp
		): Boolean
	}
	
	type MoleUser{
		firstName: String
		lastName: String
		company: String
		avatar: String
		"""
		worms in the wallet
		"""
		worms: Int!
		"""
		feature requests created by this user
		"""
		featureRequests: [FeatureRequest!]!
		createdAt: String!
	}
	
	"""
	# Deal
	Deal between 2 **MoleUsers**
	
	## Creation of a deal
	It happens when DealRequest is accepted by both parties
	"""
	type Deal{
		"""
		feature request for this deal
		"""
		featureRequest: FeatureRequest!
		"""
		Supplier accepted for the deal
		"""
		user: MoleUser!
		createdAt: String!
		"""
		Deadline proposed by the supplier
		"""
		deadline: String!
		"""
		Status of the deal
		"""
		status: DealStatus
	}
	
	"""
	Request to help on the issue
	"""
	type DealRequest{
		"""
		Feature request this deal is about
		"""
		featureRequest: FeatureRequest!
		"""
		OUser who offered deal
		"""
		user: MoleUser!
		createdAt: String!
		"""
		Deadline proposed by the user (must be sooner than deadline of feature request)
		"""
		deadline: String!
		"""
		If offer is accepted
		"""
		accepted: Boolean
		"""
		Additional message
		"""
		message: String
	}
	
	input CreateDealRequest{
		"""
		Feature request issue URL
		"""
		featureRequest: String!
		"""
		Deadline proposed by the user (must be sooner than deadline of feature request) 
		"""
		deadline: String!
		"""
		Additional message
		"""
		message: String
	}
	
	type MoleUserQuery{
		"""
		active deals I am in
		"""
		deals: [Deal!]!
		"""
		received deal requests for the feature
		"""
		receivedDealRequests: [DealRequest!]!
		"""
		given deal requests for the feature
		"""
		givenDealRequsts: [DealRequest!]!
		"""
		my feature requests
		"""
		featureRequests: [FeatureRequest!]!
	}
	
	enum DealStatus{
		"""
		Supplier is working on the feature request
		"""
		WIP
		"""
		Feature Request Creator rejected the work
		"""
		REJECTED
		"""
		Feature Request creator accepted the work by Supplier
		"""
		ACCEPTED
		"""
		Waiting for verification of Feature Request Creator
		"""
		WAITING
	}
	
	type Payment{
		"""
		amount of worms to be sent
		"""
		amountOfWorms: Int!
		"""
		Sender of the worms
		"""
		sender: MoleUser!
		"""
		Receiver of the worms
		"""
		receiver: MoleUser!
	}
	
	input SignUp{
		firstName: String
		lastName: String
		company: String
	}
	
	type ProgrammingLanguage{
		name: String!
		colour: String!
	}
	
	scalar aaa
	schema{
		query: Query,
		mutation: Mutation
	}
	`,
  library: `"""
	All queries of users system
	"""
	type UserQuery{
		"""
		Log user in
		"""
		login(
			user: UserBasicData!
		): LoggedInData
		"""
		Check if logged in user is admin<br>
		"""
		isAdmin: Boolean
		"""
		Check if there is admin already
		"""
		isAdminClaimPossible: Boolean
	}
	
	"""
	All mutations of users system
	"""
	type UserMutation{
		"""
		Make user a superadmin on a first call. Then you need to be an admin to call this
		"""
		makeAdmin(
			"""
			username of admin user<br>
			"""
			username: String!
		): Boolean
		"""
		Register a new user<br>
		"""
		register(
			user: UserBasicData!
		): LoggedInData
		forgotPassword(
			username: String!
		): Boolean
		resetPassword(
			reset: ResetPassword!
		): Boolean
	}
	
	type LoggedInData{
		token: String
	}
	
	input UserBasicData{
		username: String!
		password: String!
	}
	
	"""
	Reset password details
	"""
	input ResetPassword{
		"""
		token received from email
		
		"""
		token: String!
		"""
		New password for the user
		
		"""
		newPassword: String!
	}
	schema{
		query: UserQuery,
		mutation: UserMutation
	}`,
};
